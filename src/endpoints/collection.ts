import { Express } from "express";

import { Game, PrismaClient } from "@prisma/client";

import { getCurrentUserId } from "../utils/get-current-user-id";
import { CollectionResponse, CollectionResponsePrismaSelect, GameResponse, UserResponse } from "../types/types";

export const initializeCollectionApi = (app: Express, prisma: PrismaClient) => {
  app.get("/api/collection/get/:id", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma); // verify auth

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const collectionId = req.params.id;

    if (!collectionId) {
      return res.status(400).json({ error: `missing collection id` });
    }

    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId
      },
      select: {
        ...CollectionResponsePrismaSelect,
      }
    });

    if (!collection) {
      return res.status(404).json({ error: `collection not found` });
    }

    res.json({ collection });
  });

  app.get("/api/collection/my-collections", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const result = await prisma.collection.findMany({
      where: {
        owners: {
          some: {
            id: {
              equals: userId.id,
            }
          }
        }
      },
      select: {
        ...CollectionResponsePrismaSelect
      }
    });

    res.json({ collections: result });
  });

  app.post("/api/collection/upsert", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { collectionId, name, ownerIds, games } = req.body;

    if (!name) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    let currentCollection: {
      games: { id: string, game: { bggId: string; }; }[],
      owners: { id: string; }[];
    } = {
      games: [],
      owners: [],
    };

    if (collectionId) {
      currentCollection = await prisma.collection.findUnique({
        where: {
          id: collectionId
        },
        select: {
          games: {
            select: {
              id: true,
              game: {
                select: {
                  bggId: true,
                }
              }
            },
          },
          owners: {
            select: {
              id: true,
            },
          },
        }
      });
    }

    // Gather owner ids with logged in user listed as owner
    const owners = (ownerIds || []).concat(userId.id);
    const currentOwners = currentCollection.owners;

    if (collectionId && !currentOwners.some(owner => owner.id === userId.id)) {
      return res.status(401).json({ error: `You are not an owner of this collection` });
    }

    // Filter out duplicates
    const ownersSet = new Set(owners);

    const ownersConnect = [];
    const ownersDisconnect = [];

    currentOwners.forEach((currentOwner) => {
      if (!(owners as UserResponse[]).some((owner) => owner.id === currentOwner.id)) {
        ownersDisconnect.push({
          id: currentOwner.id,
        });
      }
    });

    ownersSet.forEach((id => {
      ownersConnect.push({
        id
      });
    }));

    // Gather games info and ids in current collection
    const currentCollectionGames = currentCollection.games;

    // Filter out duplicates of incoming games
    const gamesSet = new Set<Pick<Game, "bggId" | "name" | "urlThumb" | "urlImage" | "year">>(games || []);

    const collectionGamesDelete = [];
    const nestedGamesConnectOrCreateForNewCollection = [];
    const nestedGamesConnectOrCreateForUpdateCollection = [];

    currentCollectionGames.forEach((currentCollectionGame) => {
      if (!(games as GameResponse[]).some((game) => game.bggId === currentCollectionGame.game.bggId)) {
        collectionGamesDelete.push({
          id: currentCollectionGame.id,
        });
      }
    });

    gamesSet.forEach((game => {
      nestedGamesConnectOrCreateForNewCollection.push({
        game: {
          connectOrCreate: {
            where: {
              bggId: game.bggId,
            },
            create: {
              bggId: game.bggId,
              name: game.name,
              year: game.year,
              urlThumb: game.urlThumb,
              urlImage: game.urlImage,
            },
          },
        },
      });
    }));

    gamesSet.forEach((game => {
      if (!(currentCollectionGames).some((collectionGame) => game.bggId === collectionGame.game.bggId)) {
        nestedGamesConnectOrCreateForUpdateCollection.push({
          game: {
            connectOrCreate: {
              where: {
                bggId: game.bggId,
              },
              create: {
                bggId: game.bggId,
                name: game.name,
                year: game.year,
                urlThumb: game.urlThumb,
                urlImage: game.urlImage,
              },
            },
          },
        });
      }
    }));

    try {
      const result = await prisma.collection.upsert({
        where: {
          id: collectionId || ""
        },
        create: {
          name,
          games: {
            create: nestedGamesConnectOrCreateForNewCollection,
          },
          owners: {
            connect: ownersConnect,
          }
        },
        update: {
          name,
          games: {
            delete: collectionGamesDelete.length > 0 ? collectionGamesDelete : undefined,
            create: nestedGamesConnectOrCreateForUpdateCollection,
          },
          owners: {
            disconnect: ownersDisconnect.length > 0 ? ownersDisconnect : undefined,
            connect: ownersConnect,
          }
        },
        select: {
          ...CollectionResponsePrismaSelect
        },
      }) as CollectionResponse;

      res.json({ collection: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to create collection` });
    }
  });

  app.post("/api/collection/delete", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { collectionId } = req.body;

    if (!collectionId) {
      return res.status(400).json({ error: `Collection to delete was not specified` });
    }

    try {
      const collection = await prisma.collection.findUnique({
        where: {
          id: collectionId,
        },
        select: {
          id: true,
          owners: true,
        },
      });

      const collectionOwners = collection.owners;
      const isValidOwner = collectionOwners.some(owner => owner.id === userId.id);

      if (!isValidOwner) {
        return res.status(401).json({ error: `You are not an owner of this collection` });
      }

      const isLastOwner = collection.owners.length < 2;

      // delete collection and collection games if this is the last owner
      if (isLastOwner) {
        await prisma.collectionGame.deleteMany({
          where: {
            collectionId: {
              equals: collectionId,
            },
          },
        });

        const deletedResult = await prisma.collection.delete({
          where: {
            id: collectionId
          }
        });

        return res.status(200).json({ deletedCollectionId: deletedResult.id });
      }

      // otherwise, just remove ownership
      const updatedResult = await prisma.collection.update({
        where: {
          id: collectionId
        },
        data: {
          owners: {
            disconnect: [
              { id: userId.id }
            ]
          }
        }
      });

      return res.status(200).json({ deletedCollectionId: updatedResult.id });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to delete collection` });
    }
  });
};

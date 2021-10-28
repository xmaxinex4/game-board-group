import { Express } from "express";

import { Game, PrismaClient } from ".prisma/client";

import { getCurrentUserId } from "../utils/get-current-user-id";
import { CollectionResponse, CollectionResponsePrismaSelect } from "../types/types";

export const initializeCollectionApi = (app: Express, prisma: PrismaClient) => {
  app.get("/api/collection/get/:id", async (req, res) => {
    getCurrentUserId(req, res);
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

  app.get("/api/collection/mycollections", async (req, res) => {
    const userId = getCurrentUserId(req, res);

    const result = await prisma.collection.findMany({
      where: {
        owners: {
          some: {
            id: {
              equals: userId,
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
    const userId = getCurrentUserId(req, res);

    const { collectionId, name, ownerIds, games } = req.body;

    if (!name) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    // Gather owner ids with logged in user listed as owner
    const owners = (ownerIds || []).concat(userId);

    // Filter out duplicates
    const ownersSet = new Set(owners);

    const ownersConnect = [];

    ownersSet.forEach((id => {
      ownersConnect.push({
        id
      });
    }));

    // Gather games info and ids
    // Filter out duplicates
    const gamesSet = new Set<Pick<Game, "bggId" | "name" | "urlThumb" | "urlImage" | "year">>(games || []);

    const gamesConnectOrCreate = [];

    gamesSet.forEach((game => {
      gamesConnectOrCreate.push({
        where: {
          bggId: game.bggId,
        },
        create: {
          bggId: game.bggId,
          name: game.name,
          year: game.year,
          urlThumb: game.urlThumb,
          urlImage: game.urlImage,
        }
      });
    }));

    try {
      const result = await prisma.collection.upsert({
        where: {
          id: collectionId || ""
        },
        create: {
          name,
          games: {
            connectOrCreate: gamesConnectOrCreate,
          },
          owners: {
            connect: ownersConnect,
          }
        },
        update: {
          name,
          games: {
            connectOrCreate: gamesConnectOrCreate,
          },
          owners: {
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
    const userId = getCurrentUserId(req, res);

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
      const isValidOwner = collectionOwners.some(owner => owner.id === userId);

      if (!isValidOwner) {
        return res.status(401).json({ error: `You are not an owner of this collection` });
      }

      const isLastOwner = collection.owners.length < 2;

      // delete collection if this is the last owner
      if (isLastOwner) {
        const deletedResult = await prisma.collection.delete({
          where: {
            id: collectionId
          }
        });

        res.status(200).json({ deletedCollectionId: deletedResult.id });
      }

      // otherwise, just remove ownership
      const updatedResult = await prisma.collection.update({
        where: {
          id: collectionId
        },
        data: {
          owners: {
            disconnect: [
              { id: userId }
            ]
          }
        }
      });

      res.status(200).json({ deletedCollectionId: updatedResult.id });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to delete collection` });
    }
  });
};

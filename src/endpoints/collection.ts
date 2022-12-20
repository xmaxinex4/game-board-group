import { Express } from "express";

import { PrismaClient, Prisma, Game } from "@prisma/client";

import { getCurrentUserId } from "../utils/get-current-user-id";
import { CollectionResponse, CollectionResponsePrismaSelect } from "../types/types";
import { isCollectionOwnerCheck } from "../utils/is-collection-owner-check";

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

  app.post("/api/collection/update/name", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { collectionId, name} = req.body;

    if (!collectionId || !name) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    const { error } = await isCollectionOwnerCheck(res, collectionId, userId.id, prisma);

    if (error){
      return res.status(401).json({ error });
    }

    try {
      const result = await prisma.collection.update({
        where: {
          id: collectionId
        },
        data: { name },
          select: {
          ...CollectionResponsePrismaSelect
        },
      }) as CollectionResponse;

      res.json({ collection: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to edit collection name` });
    }
  });

  app.post("/api/collection/update/owners", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { collectionId, ownerIds } = req.body;

    if (!collectionId || !ownerIds || ownerIds?.length < 1) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    const { collection, error } = await isCollectionOwnerCheck(res, collectionId, userId.id, prisma);

    if (error){
      return res.status(401).json({ error });
    }

    const currentIds = collection?.owners?.map(owner => owner.id);
    const newIds = ownerIds;

    const disconnectOwners: { id: string }[] = [];
    const connectOwners: { id: string }[] = [];

    // if current owner id is not in new owner array, disconnect
    currentIds?.forEach(currentId => {
      if (!newIds?.some(id => id === currentId)){
        disconnectOwners.push({ id: currentId });
      }
    });

    // if new owner id is not in current owner array, connect
    newIds?.forEach(newId => {
      if (!currentIds?.some(id => id === newId)){
        connectOwners.push({ id: newId });
      }
    });

    try {
      const result = await prisma.collection.update({
      where: {
        id: collectionId
      },
      data: { 
        owners: {
          connect: connectOwners,
          disconnect: disconnectOwners,
        }
       },
               select: {
          ...CollectionResponsePrismaSelect
        },
    }) as CollectionResponse;

      res.json({ collection: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to edit owners on collection` });
    }
  });

  app.post("/api/collection/update/delete-games", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { collectionId, gameIds } = req.body;

    if (!collectionId || !gameIds || gameIds?.length < 1) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    const { error } = await isCollectionOwnerCheck(res, collectionId, userId.id, prisma);

    if(error) {
      return res.status(401).json({ error });
    }

    try {
      const result = await prisma.collection.update({
        where: {
          id: collectionId
        },
        data: {
          games: {
            deleteMany: [
              gameIds.map(id => ({ gameId: id })) 
            ]
          }
        },
        select: {
          ...CollectionResponsePrismaSelect
        },
    }) as CollectionResponse;

      res.json({ collection: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to delete games from collection` });
    }
  });

  app.post("/api/collection/update/add-games", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { collectionId, games, json } = req.body;
    const hasGameData = games?.length > 0 || json?.games;

    if (!collectionId || !hasGameData) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    const { error } = await isCollectionOwnerCheck(res, collectionId, userId.id, prisma);

    if (error) {
      return res.status(401).json({ error });
    }

    const regularGames = games as Omit<Game, "id" | "createdAt" | "updatedAt">[];
    const importedGames: (Omit<Game, "name" | "year"> & {copies: [], bggName: string, bggYear: string })[] = Array.from(json?.games);
    const newImportedGames: Omit<Game, "id" | "createdAt" | "updatedAt">[] = [];

    importedGames.forEach(game => {
      if (game.copies?.length > 0) {
        newImportedGames.push({
          bggId: game.bggId,
          name: game.bggName,
          urlImage: game.urlImage,
          urlThumb: game.urlThumb,
          year: game.bggYear,
        });
      }
    });

    const nestedGamesConnectOrCreateForNewCollection: Prisma.CollectionGameCreateOrConnectWithoutCollectionInput[] = [];
    const allNewGames = regularGames?.length > 0 ? regularGames.concat(newImportedGames) : newImportedGames;

    allNewGames.forEach((game => {
      nestedGamesConnectOrCreateForNewCollection.push({
        // where: {
        //   bgg
        // }
        // game: {
          // connectOrCreate: {
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
          // },
        // },
      });
    }));

    try {
      const result = await prisma.collection.update({
        where: {
          id: collectionId
        },
        data: {
          games: {
            connectOrCreate: {
              nestedGamesConnectOrCreateForNewCollection,
            }
          },
        },
        select: {
          ...CollectionResponsePrismaSelect
        },
      }) as CollectionResponse;

      res.json({ collection: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to add games to collection` });
    }
  });

  // app.post("/api/collection/create-with-import", async (req, res) => {
  //   const userId = await getCurrentUserId(req, res, prisma);

  //   if (userId.error) {
  //     return res.status(401).json({ error: userId.error });
  //   }

  //   const { name, ownerIds, json } = req.body;

  //   if (!name || !json?.games) {
  //     return res.status(400).json({ error: `Required parameters were not given` });
  //   }

  //   const importedGames = Array.from(json?.games);
  //   const newGames = [];

  //   importedGames.forEach((game: {
  //     urlImage: string;
  //     urlThumb: string;
  //     bggId: string;
  //     bggName: string;
  //     bggYear: string;
  //     copies: { statusOwned: string}[];
  //   }) => {
  //     if (game.copies?.length > 0) {
  //       newGames.push({
  //         bggId: game.bggId,
  //         name: game.bggName,
  //         urlImage: game.urlImage,
  //         urlThumb: game.urlThumb,
  //         year: game.bggYear,
  //       });
  //     }
  //   });

  //   const ownersConnect = ownerIds.map((id: string) => ({ id }));
  //   const nestedGamesConnectOrCreateForNewCollection = [];

  //   newGames.forEach((game => {
  //     nestedGamesConnectOrCreateForNewCollection.push({
  //       game: {
  //         connectOrCreate: {
  //           where: {
  //             bggId: game.bggId,
  //           },
  //           create: {
  //             bggId: game.bggId,
  //             name: game.name,
  //             year: game.year,
  //             urlThumb: game.urlThumb,
  //             urlImage: game.urlImage,
  //           },
  //         },
  //       },
  //     });
  //   }));

  //   try {
  //     const result = await prisma.collection.create({
  //       data: {
  //         name,
  //         games: {
  //           create: nestedGamesConnectOrCreateForNewCollection,
  //         },
  //         owners: {
  //           connect: ownersConnect,
  //         }
  //       },
  //       select: {
  //         ...CollectionResponsePrismaSelect
  //       },
  //     }) as CollectionResponse;

  //     res.json({ collection: result });
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({ error: `Failed to create collection` });
  //   }
  // });


  app.post("/api/collection/create", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { name, ownerIds, games } = req.body;

    if (!name) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    const ownersConnect = ownerIds.map(id => ({ id }));
    const nestedGamesConnectOrCreateForNewCollection = [];

    games?.forEach((game => {
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

    try {
      const result = await prisma.collection.create({
        data: {
          name,
          games: {
            create: nestedGamesConnectOrCreateForNewCollection,
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

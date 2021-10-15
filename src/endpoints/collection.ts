import { Express } from "express";

import { Game, PrismaClient } from ".prisma/client";
import { getCurrentUserId } from "../utils/get-current-user-id";

export const initializeCollectionApi = (app: Express, prisma: PrismaClient) => {
  // app.get("/api/collection/:id", async (req, res) => {
  // });

  app.get("/api/collection/mycollections", async (req, res) => {
    const userId = getCurrentUserId(req);

    if (!userId) {
      return res.status(401).json({ error: `You are currently not logged in` });
    }

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
      include: {
        games: true,
        owners: true,
      }
    });

    res.json(result);
  });

  app.post("/api/collection/upsert", async (req, res) => {
    const userId = getCurrentUserId(req);

    if (!userId) {
      return res.status(401).json({ error: `You are currently not logged in` });
    }

    const { collectionId, name, ownerIds, games } = req.body;

    if (!name) {
      return res.status(401).json({ error: `Required parameters were not given` });
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
        }
      });

      res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ error: `Failed to create collection` });
    }
  });
};

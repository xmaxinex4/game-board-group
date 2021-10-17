import { Express } from "express";

import { PrismaClient } from ".prisma/client";
import { getCurrentUserId } from "../utils/get-current-user-id";

export const initializeLibraryApi = (app: Express, prisma: PrismaClient) => {
  // app.get("/api/collection/:id", async (req, res) => {
  // });

  app.get("/api/library", async (req, res) => {
    const userId = getCurrentUserId(req);

    if (!userId) {
      return res.status(401).json({ error: `You are currently not logged in` });
    }

    const { groupId } = req.query;

    if (!groupId || !groupId.toString()) {
      return res.status(400).json({ error: `Missing Group Id` });
    }

    // groupId -> get all groupmembers in group 
    // -> get all users tied to those groupmemberships 
    // -> get all collections on those users 
    // -> create hashmap object for ui display purposes

    const groupMembers = await prisma.groupMember.findMany({
      where: {
        groupId: {
          equals: groupId.toString(),
        },
      },
      include: {
        user: true,
      }
    });

    const userIds = groupMembers.map((member) => member.userId);

    const collections = await prisma.collection.findMany({
      where: {
        owners: {
          some: {
            id: {
              in: userIds,
            }
          }
        }
      },
      include: {
        games: true,
        owners: true,
      },
      distinct: ["id"],
    });

    const library = new Map();

    // TODO: Evaluate Complexity and test logic
    collections.forEach((collection) => {
      collection.games.forEach((game) => {
        if (library[game.bggId]) {
          library[game.bggId].copies += 1;
          library[game.bggId].owners = new Set(library[game.bggId].concat(collection.owners));
        } else {
          library[game.bggId] = {
            bggId: game.bggId,
            name: game.name,
            urlThumb: game.urlThumb,
            urlImage: game.urlImage,
            year: game.year,
            copies: 1,
            owners: collection.owners.map((owner) => ({ username: owner.username, color: owner.color })),
          };
        }
      });
    });

    res.json({ library });
  });
};
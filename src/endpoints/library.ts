import { Express } from "express";

import { Color, PrismaClient } from ".prisma/client";
import { getCurrentUserId } from "../utils/get-current-user-id";
import { GameResponse } from "../types/types";

export const initializeLibraryApi = (app: Express, prisma: PrismaClient) => {
  // app.get("/api/collection/:id", async (req, res) => {
  // });

  app.get("/api/library", async (req, res) => {
    getCurrentUserId(req, res); // check authorization

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

    const userIds = groupMembers.map((member) => member.user.id);

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
      select: {
        games: true,
        owners: {
          select: {
            id: true,
            username: true,
            color: true,
          }
        }
      },
      distinct: ["id"],
    });

    const library = new Map<string, GameResponse & { owners: { username: string, color: Color; id: string; }[]; }>();

    // TODO: Evaluate Complexity and test logic
    collections.forEach((collection) => {
      collection.games.forEach((game) => {
        const existingLibraryGameEntry = library[game.bggId];

        if (existingLibraryGameEntry) {
          collection.owners.forEach((owner) => {
            if (userIds.some(id => id === owner.id) && !existingLibraryGameEntry.owners.some(ownerOnLibaryGame => ownerOnLibaryGame.id === owner.id)) {
              library[game.bggId] = { ...existingLibraryGameEntry, owners: existingLibraryGameEntry.owners.concat(owner) };
            }
          });
        } else {
          library[game.bggId] = {
            bggId: game.bggId,
            name: game.name,
            urlThumb: game.urlThumb,
            urlImage: game.urlImage,
            year: game.year,
            owners: collection.owners.filter((owner) => userIds.some(id => id === owner.id)),
          };
        }
      });
    });

    res.json({ library });
  });
};

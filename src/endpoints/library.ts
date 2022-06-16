import { Express } from "express";

import { Color, PrismaClient } from "@prisma/client";
import { getCurrentUserId } from "../utils/get-current-user-id";
import { CollectionGameResponse, CollectionGameResponsePrismaSelect, GameResponse } from "../types/types";

export const initializeLibraryApi = (app: Express, prisma: PrismaClient) => {
  app.get("/api/library", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma); // check authorization

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
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
        games: {
          select: {
            ...CollectionGameResponsePrismaSelect,
          },
        },
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

    const library = new Map<string, CollectionGameResponse & { owners: { username: string, color: Color; id: string; }[]; }>();

    // TODO: Evaluate Complexity and test logic
    collections.forEach((collection) => {
      collection.games.forEach((collectionGame) => {
        const existingLibraryGameEntry = library[collectionGame.game.bggId];

        if (existingLibraryGameEntry) {
          collection.owners.forEach((owner) => {
            if (userIds.some(id => id === owner.id) && !existingLibraryGameEntry.owners.some(ownerOnLibaryGame => ownerOnLibaryGame.id === owner.id)) {
              library[collectionGame.game.bggId] = { ...existingLibraryGameEntry, owners: existingLibraryGameEntry.owners.concat(owner) };
            }
          });
        } else {
          library[collectionGame.game.bggId] = {
            id: collectionGame.id,
            createdAt: collectionGame.createdAt,
            bggId: collectionGame.game.bggId,
            name: collectionGame.game.name,
            urlThumb: collectionGame.game.urlThumb,
            urlImage: collectionGame.game.urlImage,
            year: collectionGame.game.year,
            owners: collection.owners.filter((owner) => userIds.some(id => id === owner.id)),
          };
        }
      });
    });

    res.json({ library });
  });
};

import { Express } from "express";

import { PrismaClient } from ".prisma/client";
import { getCurrentUserId } from "../utils/get-current-user-id";

export const initializeGroupApi = (app: Express, prisma: PrismaClient) => {
  app.post('/api/group/create', async (req, res) => {
    const userId = getCurrentUserId(req);

    if (!userId) {
      return res.status(401).json({ error: `You are currently not logged in` });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: `Missing name` });
    }

    try {
      const group = await prisma.group.create({
        data: {
          name,
          members: {
            create: [
              {
                user: {
                  connect: {
                    id: userId,
                  }
                },
                isAdmin: true,
              }
            ]
          }
        },
      });

      return res.status(201).json({ group });
    } catch (error) {
      console.error("Error on group create: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });
};

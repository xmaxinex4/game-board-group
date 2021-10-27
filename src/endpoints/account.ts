import { Express } from "express";

import { PrismaClient } from ".prisma/client";

import { getCurrentUserId } from "../utils/get-current-user-id";
import { ActiveUserResponse, ActiveUserResponsePrismaSelect } from "../types/types";

export const initializeAccountApi = (app: Express, prisma: PrismaClient) => {
  app.post("/api/account/edit", async (req, res) => {
    const userId = getCurrentUserId(req, res);
    const { username, color } = req.body;

    if (!username) {
      return res.status(400).json({ error: `Missing username value.` });
    }

    if (!color) {
      return res.status(400).json({ error: `Missing color value.` });
    }

    try {
      const result = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          username,
          color,
        },
        select: {
          ...ActiveUserResponsePrismaSelect
        }
      }) as ActiveUserResponse;

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error updating user account data: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/account/change-password", async (req, res) => {
    const userId = getCurrentUserId(req, res);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ error: `Missing current password for verification.` });
    }

    if (!newPassword) {
      return res.status(400).json({ error: `Missing new password value.` });
    }

    try {
      const currentPasswordInDb = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          password: true
        }
      });

      if (currentPasswordInDb !== currentPassword) {
        return res.status(401).json({ error: `Current password is incorrect.` });
      }

      const result = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          password: newPassword
        },
        select: {
          ...ActiveUserResponsePrismaSelect
        }
      }) as ActiveUserResponse;

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error updating user password: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });
};

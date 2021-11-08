import { Express } from "express";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

import { PrismaClient } from ".prisma/client";

import { getCurrentUserId } from "../utils/get-current-user-id";
import { ActiveUserGroupMembershipsResponse, ActiveUserResponsePrismaSelect, GroupMembershipResponsePrismaSelect, UserPlayPreferenceResponse, UserPlayPreferenceResponsePrismaSelect } from "../types/types";

export const initializeUserApi = (app: Express, prisma: PrismaClient, redisGet) => {
  app.get("/api/user/active-user", async (req, res) => {
    try {
      const userId = getCurrentUserId(req, res);
      const result = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          ...ActiveUserResponsePrismaSelect
        }
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error getting current user: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.get("/api/user/active-user-group-memberships", async (req, res) => {
    try {
      const userId = getCurrentUserId(req, res);
      const result = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          groupMemberships: { // my memberships
            select: {
              ...GroupMembershipResponsePrismaSelect
            }
          }
        }
      }) as ActiveUserGroupMembershipsResponse;

      const groupMembershipsWithActiveInviteLinks = [];


      await Promise.all(
        result.groupMemberships?.map(async (membership) => {
          let activeInviteLink = "";

          if (membership.isAdmin) {
            const codeFromRedis = await redisGet(membership.id);
            if (codeFromRedis) {
              activeInviteLink = `${process.env.BASEURL}invite/${codeFromRedis}`;
            }
          }

          groupMembershipsWithActiveInviteLinks.push({ ...membership, activeInvitationLink: activeInviteLink });
        })
      );

      return res.status(200).json({ groupMemberships: groupMembershipsWithActiveInviteLinks });
    } catch (error) {
      console.error("Error getting current user: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/user/create", async (req, res) => {
    const { color, email, password, username } = req.body;

    if (!color) {
      return res.status(400).json({ error: `Missing color` });
    }

    if (!email) {
      return res.status(400).json({ error: `Missing email` });
    }

    function validateEmail(email: string) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: `Invalid email address` });
    }

    if (!password) {
      return res.status(400).json({ error: `Missing password` });
    }

    if (!username) {
      return res.status(400).json({ error: `Missing username` });
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingEmail) {
      return res.status(400).json({ error: `Email taken` });
    }

    try {
      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
        data: {
          color,
          email: email.toLowerCase(),
          password: hashedPassword,
          username,
        },
      });

      const token = sign({ userId: user.id }, process.env.APP_SECRET);
      return res.status(201).json({ token });
    } catch (error) {
      console.error("Error on user create: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/user/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: `Missing email` });
    }

    if (!password) {
      return res.status(400).json({ error: `Missing password` });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        },
      });

      if (!user) {
        return res.status(401).json({ error: `Invalid email or password` });
      }

      const passwordValid = await compare(password, user.password);

      if (!passwordValid) {
        return res.status(401).json({ error: `Invalid email or password` });
      }

      // TODO: Might not be secure storing email and id in public jwt token, look into that
      const token = sign({ userId: user.id }, process.env.APP_SECRET);

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error on sign in: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.get("/api/user/active-user-play-preferences", async (req, res) => {
    try {
      const userId = getCurrentUserId(req, res);
      const result = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          playPreferences: {
            select: {
              ...UserPlayPreferenceResponsePrismaSelect
            }
          }
        }
      }) as { playPreferences: UserPlayPreferenceResponse[]; };

      return res.status(200).json(result.playPreferences);
    } catch (error) {
      console.error("Error getting current user play preferences: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/user/play-preference/upsert", async (req, res) => {
    const userId = getCurrentUserId(req, res);

    const { id, preference, bggId } = req.body;

    if (!preference || !bggId) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    try {
      const result = await prisma.userPlayPreference.upsert({
        where: {
          id: id || ""
        },
        create: {
          preference,
          game: {
            connect: {
              bggId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
        update: {
          preference,
        },
        select: {
          ...UserPlayPreferenceResponsePrismaSelect
        },
      }) as UserPlayPreferenceResponse;

      res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to upsert user game play preference` });
    }
  });

  app.post("/api/user/play-preference/delete", async (req, res) => {
    getCurrentUserId(req, res);

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: `Required parameters were not given` });
    }

    try {
      const result = await prisma.userPlayPreference.delete({
        where: {
          id
        },
        select: {
          ...UserPlayPreferenceResponsePrismaSelect
        },
      }) as UserPlayPreferenceResponse;

      res.json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: `Failed to delete user game play preference` });
    }
  });
};

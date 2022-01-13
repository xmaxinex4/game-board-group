import { Express } from "express";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient } from ".prisma/client";

import { getCurrentUserId } from "../utils/get-current-user-id";
import { ActiveUserGroupMembershipsResponse, ActiveUserResponsePrismaSelect, GroupMembershipResponsePrismaSelect, UserPlayPreferenceResponse, UserPlayPreferenceResponsePrismaSelect } from "../types/types";
import { MailService } from "@sendgrid/mail";

export const initializeUserApi = (app: Express, prisma: PrismaClient, redisGet, redisSet, redisDelete, sgMail: MailService) => {
  app.get("/api/user/active-user", async (req, res) => {
    try {
      const userId = await getCurrentUserId(req, res, prisma);

      if (userId.error) {
        return res.status(401).json({ error: userId.error });
      }

      const result = await prisma.user.findUnique({
        where: {
          id: userId.id
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
      const userId = await getCurrentUserId(req, res, prisma);

      if (userId.error) {
        return res.status(401).json({ error: userId.error });
      }

      const result = await prisma.user.findUnique({
        where: {
          id: userId.id
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
        result?.groupMemberships?.map(async (membership) => {
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
        email: email.toLowerCase(),
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (existingEmail && existingEmail.isActive) {
      return res.status(400).json({ error: `Email taken` });
    }

    try {
      // un-verified accounts should not block emails and should be deleted so the email is free
      if (existingEmail && !existingEmail.isActive) {
        await prisma.user.delete({
          where: {
            email: email.toLowerCase(),
          },
        });
      }

      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
        data: {
          color,
          email: email.toLowerCase(),
          password: hashedPassword,
          username,
        },
      });

      if (!user) {
        return res.status(500).json({ error: `Something went wrong, unable to create user. Please try again.` });
      }

      // save link in redis
      let uniqueKeyFound = false;
      let accountActivationCode = "";

      while (!uniqueKeyFound) {
        let possibleKey = uuidv4().split("-")[0];
        let keyInRedis = await redisGet(possibleKey);
        if (!keyInRedis) { // making sure key is unique
          accountActivationCode = possibleKey;
          uniqueKeyFound = true;
        }
      }

      const oneDayTtl = 24 * 60 * 60;

      const setAccountActivationCode = await redisSet(accountActivationCode, `account-verification-${user.email.toLowerCase()}`, "EX", oneDayTtl);

      if (!setAccountActivationCode) {
        console.log("Error setting redis key for account activation");
        return res.status(400).json({ error: `Unable to send account activation link.` });
      }

      // send email using send grid with link code
      const msg = {
        to: user.email,
        from: "gameboardgroup@gameboardgroup.com",
        template_id: "d-af84d37dfa06434a9b711b814ef6334d",
        html: "", // todo: might break things, test email
        dynamicTemplateData: {
          name: user.username,
          code: accountActivationCode,
        },
      };
      sgMail
        .send(msg)
        .catch((error) => {
          throw error;
        });

      return res.status(201).json();
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
          email: email.toLowerCase()
        },
      });

      if (!user) {
        return res.status(401).json({ error: `Invalid email or password` });
      }

      const passwordValid = await compare(password, user.password);

      if (!passwordValid) {
        return res.status(401).json({ error: `Invalid email or password` });
      }

      if (!user.isActive) {
        return res.status(401).json({ error: `User is not active` });
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
      const userId = await getCurrentUserId(req, res, prisma);

      if (userId.error) {
        return res.status(401).json({ error: userId.error });
      }

      const result = await prisma.user.findUnique({
        where: {
          id: userId.id
        },
        select: {
          playPreferences: {
            select: {
              ...UserPlayPreferenceResponsePrismaSelect
            }
          }
        }
      }) as { playPreferences: UserPlayPreferenceResponse[]; };

      return res.status(200).json(result?.playPreferences);
    } catch (error) {
      console.error("Error getting current user play preferences: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/user/play-preference/upsert", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

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
              id: userId.id,
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
    const userId = await getCurrentUserId(req, res, prisma); // verify auth

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

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

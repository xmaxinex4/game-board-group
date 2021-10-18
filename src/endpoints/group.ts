import redis from "redis";
import { v4 as uuidv4 } from "uuid";

import { Express } from "express";

import { PrismaClient } from ".prisma/client";
import { getCurrentUserId } from "../utils/get-current-user-id";

export const initializeGroupApi = (app: Express, prisma: PrismaClient, redis: redis.RedisClient) => {
  app.post('/api/group/create', async (req, res) => {
    const userId = getCurrentUserId(req, res);

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
        select: {
          id: true,
          name: true,
          members: {
            select: {
              id: true,
              isAdmin: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  color: true,
                }
              }
            }
          }
        }
      });

      return res.status(201).json({ group });
    } catch (error) {
      console.error("Error on group create: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post('/api/group/generate-invitation-link', async (req, res) => {
    const userId = getCurrentUserId(req, res);

    const { groupId, timeout } = req.body;

    if (!groupId) {
      return res.status(400).json({ error: `Missing group id.` });
    }

    let ttl = 7 * 24 * 60 * 60;
    switch (timeout || "1WEEK") {
      case "30MIN":
        ttl = 60 * 30;
        break;
      case "1HR":
        ttl = 60 * 60;
        break;
      case "6HR":
        ttl = 6 * 60 * 60;
        break;
      case "12HR":
        ttl = 12 * 60 * 60;
        break;
      case "1DAY":
        ttl = 24 * 60 * 60;
        break;
      case "1WEEK":
      default:
        ttl = 7 * 24 * 60 * 60;
        break;
    }

    const groupInvitationKey = uuidv4();

    redis.set(groupInvitationKey, groupId, "EX", ttl, function (err) {
      if (err) {
        console.log("Error setting redis key for invitation link: ", err);
        return res.status(400).json({ error: `Unable to get new invitation link.` });
      }
    });

    redis.set(groupId, groupInvitationKey, "EX", ttl, function (err) {
      if (err) {
        console.log("Error setting redis key for invitation link: ", err);
        return res.status(400).json({ error: `Unable to get new invitation link.` });
      }
    });

    return res.status(200).json({ link: `${process.env.BASEURL}/api/group/add-user?guid="${groupInvitationKey}"` });
  });

  app.post('/api/group/add-user', async (req, res) => {
    const userId = getCurrentUserId(req, res);

    const { guid } = req.query;

    if (!guid || !guid.toString()) {
      return res.status(400).json({ error: `Missing invitition code.` });
    }

    let groupId = null;
    // get redis entry for guid, throw error if not found
    redis.get(guid.toString(), function (err, reply) {
      if (err) {
        console.log("Error getting redis key for invitation link: ", err);
        return res.status(400).json({ error: `Unable to verify invitation link.` });
      } else {
        groupId = reply;
      }
    });

    if (!groupId) {
      return res.status(400).json({ error: `Unable to verify invitation link.` });
    }

    const userInGroupCheck = prisma.groupMember.findFirst({
      where: {
        AND: [
          {
            userId: {
              equals: userId,
            }
          },
          {
            groupId: {
              equals: groupId,
            }
          },
        ]
      }
    });

    if (!userInGroupCheck) {
      return res.status(400).json({ error: `User is already in this group.` });
    }

    try {
      const group = await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          members: {
            create: [
              {
                user: {
                  connect: {
                    id: userId,
                  }
                },
                isAdmin: false,
              }
            ]
          }
        },
        select: {
          id: true,
          name: true,
          members: {
            select: {
              id: true,
              isAdmin: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  color: true,
                }
              }
            }
          }
        }
      });

      return res.status(201).json({ group });
    } catch (error) {
      console.error("Error verifying invitation link: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });
};

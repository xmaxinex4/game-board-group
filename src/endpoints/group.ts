import { v4 as uuidv4 } from "uuid";

import { Express } from "express";

import { PrismaClient } from ".prisma/client";
import { getCurrentUserId } from "../utils/get-current-user-id";

export const initializeGroupApi = (app: Express, prisma: PrismaClient, redisGet, redisSet) => {
  app.post('/api/group/create', async (req, res) => {
    const userId = getCurrentUserId(req, res);

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: `Missing name` });
    }

    try {
      const groupMembership = await prisma.groupMember.create({
        data: {
          user: {
            connect: {
              id: userId,
            }
          },
          group: {
            create: {
              name
            }
          },
          isAdmin: true,
        },
        select: {
          id: true,
          isAdmin: true,
          group: {
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
          }
        }
      });

      return res.status(201).json({ ...groupMembership, activeInvitationLink: "" });
    } catch (error) {
      console.error("Error on group create: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post('/api/group/generate-invitation-link', async (req, res) => {
    const userId = getCurrentUserId(req, res);

    const { groupMembershipId, timeout } = req.body;

    if (!groupMembershipId) {
      return res.status(400).json({ error: `Missing Group Membership id.` });
    }

    const userGroupMembership = await prisma.groupMember.findFirst({
      where: {
        AND: [
          {
            id: { equals: groupMembershipId },
          },
          {
            user: {
              id: { equals: userId }
            }
          }
        ]

      },
      select: {
        isAdmin: true,
      }
    });

    if (!userGroupMembership || !userGroupMembership.isAdmin) {
      return res.status(401).json({ error: `You do not have permission to generate an invite link for this group.` });
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

    // TODO: If there is a key for this groupMembershipId already, delete it and the matching pair

    let uniqueKeyFound = false;
    let groupInvitationKey = "";

    while (!uniqueKeyFound) {
      let possibleKey = uuidv4().split("-")[0];
      let keyInRedis = await redisGet(possibleKey);
      if (!keyInRedis) { // making sure key is unique
        groupInvitationKey = possibleKey;
        uniqueKeyFound = true;
      }
    }

    const setInviteToGroupKey = await redisSet(groupInvitationKey, groupMembershipId, "EX", ttl);
    const setGroupToInviteKey = await redisSet(groupMembershipId, groupInvitationKey, "EX", ttl);

    if (!setInviteToGroupKey || !setGroupToInviteKey) {
      console.log("Error setting redis key for invitation link: ");
      return res.status(400).json({ error: `Unable to get new invitation link.` });
    }

    return res.status(200).json({ link: `${process.env.BASEURL}group-invite/${groupInvitationKey}` });
  });

  app.post('/api/group/add-user', async (req, res, next) => {
    const userId = getCurrentUserId(req, res);

    const { guid } = req.body;

    if (!guid || !guid.toString()) {
      return res.status(400).json({ error: `Missing invitition code.` });
    }

    const groupMembershipId = await redisGet(guid.toString());

    if (!groupMembershipId) {
      console.log("Failed to get redis key for invitation link; link not found in Redis.");
      return res.status(400).json({ error: `Link Expired` });
    };

    const group = await prisma.groupMember.findUnique({
      where: {
        id: groupMembershipId
      },
      select: {
        groupId: true,
      }
    });

    if (!group) {
      return res.status(400).json({ error: `Unable to verify invitation link.` });
    }

    const existingUserGroupMembership = await prisma.groupMember.findFirst({
      where: {
        AND: [
          {
            userId: {
              equals: userId,
            }
          },
          {
            groupId: {
              equals: group.groupId,
            }
          },
        ]
      },
      select: {
        id: true,
        isAdmin: true,
        group: {
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
        }
      }
    });

    if (existingUserGroupMembership) {
      return res.status(201).json({ ...existingUserGroupMembership, activeInvitationLink: "", alreadyInGroup: true });
    }

    try {
      const groupMembership = await prisma.groupMember.create({
        data: {
          user: {
            connect: {
              id: userId,
            }
          },
          group: {
            connect: {
              id: group.groupId,
            }
          },
          isAdmin: false,
        },
        select: {
          id: true,
          isAdmin: true,
          group: {
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
          }
        }
      });

      return res.status(201).json({ ...groupMembership, activeInvitationLink: "", alreadyInGroup: false });
    } catch (error) {
      console.error("Error verifying invitation link: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });
};

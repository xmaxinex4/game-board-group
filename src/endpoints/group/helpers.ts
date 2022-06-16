
import { PrismaClient } from "@prisma/client";

export async function getIsGroupAdmin(prisma: PrismaClient, groupMembershipId: string, userId: string) {
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

  return userGroupMembership && userGroupMembership.isAdmin;
}

export async function lookupGroupMembership(prisma: PrismaClient, groupMembershipId: string) {
  return await prisma.groupMember.findUnique({
    where: {
      id: groupMembershipId
    },
    select: {
      isAdmin: true,
      user: {
        select: {
          id: true,
        },
      },
      group: {
        select: {
          id: true,
          ownedByUserId: true,
          members: {
            select: {
              isAdmin: true,
            },
          },
        },
      },
    },
  });
}

export async function getIsAdminInGroup(prisma: PrismaClient, groupId: string, userId: string) {
  return await prisma.group.findFirst({
    where: {
      AND: [
        {
          id: { equals: groupId },
        },
        {
          members: {
            some: {
              AND: [
                {
                  userId: {
                    equals: userId
                  }
                },
                {
                  isAdmin: {
                    equals: true,
                  },
                },
              ],
            },
          },
        },
      ],
    },
    select: {
      id: true,
    }
  });
}

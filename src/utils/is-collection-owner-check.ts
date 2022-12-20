import { PrismaClient } from "@prisma/client";
import { Response } from "express";

export async function isCollectionOwnerCheck(res: Response, collectionId: string, userId: string, prisma: PrismaClient) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId
    },
    select: {
      owners: {
        select: {
          id: true,
        },
      },
    }
  });

  if (!collection) {
    return { error: `Collection not found`, collection: null };
  }

  const currentOwners = collection.owners;
  if (!currentOwners.some(owner => owner.id === userId)) {
    return { error: `You are not an owner of this collection`, collection: null }; 
  }

  return { error: null, collection };
}
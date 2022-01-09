
import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Token {
  userId: string;
}

// Gets the id of the currently logged in user
export async function getCurrentUserId(req: Request, res: Response, prisma: PrismaClient) {
  const authorization = req.get("Authorization");

  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, process.env.APP_SECRET || "") as Token;

    if (!verifiedToken || !verifiedToken?.userId) {
      return { error: `You are currently not logged in`, id: "" };
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: verifiedToken.userId,
      },
    });

    if (!currentUser) {
      return { error: `User not found`, id: "" };
    }

    if (!currentUser.isActive) {
      return { error: `Email needs confirmation to activate`, id: "" };
    }

    return verifiedToken && { id: verifiedToken.userId };
  } else {
    return { error: `You are currently not logged in`, id: "" };
  }
}

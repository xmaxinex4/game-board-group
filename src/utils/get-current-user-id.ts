
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
      res.status(401).json({ error: `You are currently not logged in` });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: verifiedToken.userId,
      },
    });

    if (!currentUser) {
      res.status(401).json({ error: `User not found` });
    }

    if (!currentUser.isActive) {
      res.status(401).json({ error: `Email needs confirmation to activate` });
    }

    return verifiedToken && verifiedToken.userId;
  } else {
    res.status(401).json({ error: `You are currently not logged in` });
  }
}

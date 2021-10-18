
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Token {
  userId: string;
}

// Gets the id of the currently logged in user
export function getCurrentUserId(req: Request, res: Response) {
  const authorization = req.get("Authorization");

  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, process.env.APP_SECRET || "") as Token;

    if (!verifiedToken && !verifiedToken.userId) {
      res.status(401).json({ error: `You are currently not logged in` });
    }

    return verifiedToken && verifiedToken.userId;
  } else {
    res.status(401).json({ error: `You are currently not logged in` });
  }
}

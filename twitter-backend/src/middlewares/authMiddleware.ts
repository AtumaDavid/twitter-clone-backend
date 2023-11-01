import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const JWT_SECRET = "SUPER SECRET";
const prisma = new PrismaClient();

type AuthRequest = Request & { user?: User };

export async function authenticateToken(
  //   req: Request,
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Authentication
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  const jwtToken = authHeader?.split(" ")[1];
  if (!jwtToken) {
    return res.sendStatus(401);
  }
  // console.log(token);

  // --decode the jwt token--
  try {
    const payload = (await jwt.verify(jwtToken, JWT_SECRET)) as {
      tokenId: number;
    };
    // console.log("Payload: ", payload);
    if (!payload.tokenId) {
      return res.sendStatus(401);
    }
    const dbToken = await prisma.token.findUnique({
      where: { id: payload.tokenId },
      include: { user: true },
    });
    // console.log(dbToken);

    if (!dbToken?.valid || dbToken.expiration < new Date()) {
      return res.status(401).json({ error: "API token not valid" });
    }
    // if (dbToken.expiration < new Date()) {
    //   return res.status(401).json({ error: "Api token is expired" });
    // }
    // console.log(dbToken.user);
    req.user = dbToken.user;
  } catch (error) {
    return res.sendStatus(401);
  }

  next();
}

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create tweet
export const createTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, userId, image } = req.body;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        userId,
        image,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

export const getAllTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.status(501).json({ error: "Not implemented" });
  const allTweets = await prisma.tweet.findMany();
  res.json(allTweets);
};

export const getSpecificTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.status(501).json({ error: "Not implemented" });
  const { id } = req.params;
  const oneTweet = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!oneTweet) {
    res.status(404).json({ error: "Tweet not found" });
  }
  res.json(oneTweet);
};

export const deleteTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.status(501).json({ error: "Not implemented" });
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).send("tweet deleted");
  } catch (error) {
    res.status(500).json({ error: "failed to delete" });
  }
};

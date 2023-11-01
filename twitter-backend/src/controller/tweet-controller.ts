import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create tweet
export const createTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { content, userId, image } = req.body;
  const { content, image } = req.body;
  // @ts-ignore
  const user = req.user;

  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        userId: user.id,
        image,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
};

// get all tweets
export const getAllTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.status(501).json({ error: "Not implemented" });
  //{include: {user: true}}--- every tweet to contain info about user. check: model Tweet(schema.prisma): "user"
  const allTweets = await prisma.tweet.findMany({
    include: {
      user: {
        select: {
          name: true,
          username: true,
          id: true,
          image: true,
        },
      },
    },
  });

  res.json(allTweets);
};

export const getSpecificTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const oneTweet = await prisma.tweet.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
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

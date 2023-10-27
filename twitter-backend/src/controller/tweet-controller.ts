import { Request, Response, NextFunction } from "express";

export const createTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const getAllTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const getSpecificTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const deleteTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

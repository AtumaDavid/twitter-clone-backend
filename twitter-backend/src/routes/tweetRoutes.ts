import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getSpecificTweet,
} from "../controller/tweet-controller";

const tweetRouter = express.Router();

tweetRouter.post("/createTweet", createTweet);
tweetRouter.get("/", getAllTweets);
tweetRouter.get("/:id", getSpecificTweet);
tweetRouter.delete("/:id", deleteTweet);

export default tweetRouter;

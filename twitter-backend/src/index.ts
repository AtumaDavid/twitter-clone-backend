import express from "express";
import userRouter from "./routes/userRoutes";
import tweetRouter from "./routes/tweetRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/user", tweetRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

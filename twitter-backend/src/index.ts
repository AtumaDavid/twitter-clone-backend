import express from "express";
import userRouter from "./routes/userRoutes";
import tweetRouter from "./routes/tweetRoutes";
import authRouter from "./routes/authRoutes";
import { authenticateToken } from "./middlewares/authMiddleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/user", authenticateToken, userRouter);
app.use("/api/tweet", authenticateToken, tweetRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSpecificUser,
  loginUser,
  updateUser,
} from "../controller/user-controller";

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSpecificUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;

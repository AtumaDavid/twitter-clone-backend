import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//create user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   res.status(501).json({ error: "Not implemented" });
  const { email, name, username } = req.body;
  //   console.log(email, name, username);
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "Hey I'm new here",
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Username and email should be unique" });
  }
};

// login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

// update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { bio, name, username, image } = req.body;
  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        bio,
        name,
        username,
        image,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json("failed to update");
  }
  //   res.status(501).json({ error: "Not implemented" });
};

// get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
  //   res.status(501).json({ error: "Not implemented" });
};

// get one user
export const getSpecificUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   res.status(501).json({ error: "Not implemented" });
  const { id } = req.params;
  const oneUser = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(oneUser);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

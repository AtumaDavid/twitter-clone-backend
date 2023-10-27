import { Request, Response, NextFunction } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const getSpecificUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(501).json({ error: "Not implemented" });
};

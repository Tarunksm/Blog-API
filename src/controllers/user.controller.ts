import prisma from "../lib/prisma";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      message: "User created successfully",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

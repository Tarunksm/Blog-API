import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(401).send("Invalid email or password");
    }
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(401).send("Incorrect passworrd");
    }
    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

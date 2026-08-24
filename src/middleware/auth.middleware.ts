import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(401).send("Token is not provided");
    }
    const token = authHeaders.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
};

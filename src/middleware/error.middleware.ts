import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const reerrorHanlder = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(error);
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      error: error.issues,
    });
  }
  res.status(500).send("Something went wrong");
};

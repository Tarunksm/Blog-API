import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(result.error);
    }
    next();
  };
};

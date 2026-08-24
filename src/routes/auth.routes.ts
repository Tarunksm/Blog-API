import express from "express";
import { loginController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { loginSchema } from "../validators/auth.validator";

export const router = express.Router();

router.post("/", validate(loginSchema), loginController);

export default router;

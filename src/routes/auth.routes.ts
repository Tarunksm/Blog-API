import express from "express";
import { loginController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";

export const router = express.Router();

router.post("/", validate(loginSchema), loginController);

export default router;

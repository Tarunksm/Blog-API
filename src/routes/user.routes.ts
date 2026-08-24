import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", validate(createUserSchema), createUser);

export default router;

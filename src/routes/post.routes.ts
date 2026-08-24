import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createPost,
  deletePostById,
  editPostById,
  getPostById,
  getPosts,
} from "../controllers/post.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { postSchema } from "../validators/post.validator.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/", authMiddleware, validate(postSchema), createPost);

router.put("/:id", authMiddleware, validate(postSchema), editPostById);

router.delete("/:id", authMiddleware, deletePostById);

export default router;

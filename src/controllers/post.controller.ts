import prisma from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";

interface userPayload {
  userId: number;
}

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content } = req.body;
    const { userId } = req.user as userPayload;
    if (!userId) {
      return res.status(401).send("Session or token expired, login again");
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;

    page = Math.max(page, 1);
    limit = Math.min(limit, 20);

    const search = req.query.search as string;

    const sort = req.query.sort;

    let orderBy = {};
    if (sort === "latest") {
      orderBy = {
        createdAt: "desc",
      };
    }
    if (sort === "oldest") {
      orderBy = {
        createdAt: "asc",
      };
    }

    const posts = await prisma.post.findMany({
      orderBy,
      where: search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      skip: page - 1 * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Post id is requied");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const editPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const userId = req.user?.userId;
    if (post.userId !== userId) {
      return res.status(403).send("You cannot edit this post");
    }
    const { title, content } = req.body;
    const editedPost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
    res.status(201).json(editedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const userId = req.user?.userId;
    if (post.userId !== userId) {
      return res.status(403).send("You cannot delete this post");
    }
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
};

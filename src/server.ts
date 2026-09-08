import express from "express";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import authRouter from "./routes/auth.routes.js";
import { reerrorHanlder } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use(reerrorHanlder);

app.listen(3000, () => console.log("Server is running on port 3000"));

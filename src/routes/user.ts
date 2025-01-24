import express from "express";
import { createUser, getUsers, login } from "../controllers/usersController";
import { localMiddleware } from "../libs/passport-local";

const usersRouter = express.Router();

usersRouter.post("/register", createUser);
usersRouter.get("/getUsers", getUsers);
usersRouter.post("/login", localMiddleware, login);

export default usersRouter;

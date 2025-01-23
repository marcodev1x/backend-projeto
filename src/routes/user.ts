import express from "express";
import { createUser, getUsers, login } from "../controllers/usersController";
import { autorizathion } from "../middlewares/auth";

const usersRouter = express.Router();

usersRouter.post("/register", createUser);
usersRouter.get("/getUsers", getUsers);
usersRouter.post("/login", autorizathion, login);

export default usersRouter;

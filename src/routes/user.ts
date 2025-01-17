import express from "express";
import { createUser, getUsers } from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/register", createUser);
usersRouter.get("/getUsers", getUsers);

export default usersRouter;

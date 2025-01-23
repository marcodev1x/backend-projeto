import { Request, RequestHandler, Response } from "express";
import z from "zod";
import { usersService } from "../services/userService";
import { userBody } from "../utils/schemas";

export const createUser = async (req: Request, res: Response) => {
  const body = req.body;

  const validateSchema = userBody.safeParse(body);
  const userExists = await usersService.findUniqueUser(body.email);

  if (userExists) {
    res.status(400).json({ msg: "Email já existente." });
  }

  if (!validateSchema.success) {
    res.status(400).json({ msg: validateSchema.error.issues[0].message });
  }

  try {
    const registerUserFinally = await usersService.createUsers(body);
    res
      .status(200)
      .json({ msg: "Sucesso ao criar usuário", registerUserFinally });
  } catch (err) {}
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await usersService.getUsers();

  if (!users) res.status(400).json({ msg: "Erro ao buscar usuários" });
  else res.status(201).json({ msg: "Sucesso ao buscar usuários", users });
};

export const getUniqueUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  if (!email) res.status(400).json({ msg: "Email obrigatório" });

  const userGet = await usersService.findUniqueUser(email);
  res.status(201).json({ msg: "Sucesso ao buscar usuário", userGet });
};

export const login = async (req: Request, res: Response) => {
  res.status(201).json({ msg: "Login " + true });
};

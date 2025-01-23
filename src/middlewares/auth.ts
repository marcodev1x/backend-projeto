import express, { RequestHandler } from "express";
import { usersService } from "../services/userService";

export const autorizathion: RequestHandler = async (
  req,
  res,
  next
): Promise<Response | undefined> => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Dados inválidos ou faltando" });

  const userFind = await usersService.findUserByEmailAndPassword(
    email,
    password
  );

  if (!userFind)
    return res
      .status(404)
      .json({ msg: "Erro ao acessar conta. Tente novamente." });

  res.status(201).json({ msg: "Sucesso ao logar", userFind });
};

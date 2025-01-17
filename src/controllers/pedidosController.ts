import { Request, Response } from "express";
import z from "zod";
import { pedidosBody } from "../utils/schemas";
import { pedidoService } from "../services/pedidoService";
export const registerPedidos = async (req: Request, res: Response) => {
  const validateBody = pedidosBody.safeParse(req.body);

  if (!validateBody.success)
    res.status(400).json(validateBody.error.issues[0].message);
  else {
    try {
      const finallyCreateOrder = await pedidoService.createPedido(
        validateBody.data.userId,
        validateBody.data.productIds
      );
      if (!finallyCreateOrder) {
        res.status(400).json({ msg: "Erro ao criar pedido" });
      }

      res
        .status(201)
        .json({ msg: "Sucesso ao criar pedido", finallyCreateOrder });
    } catch (err) {}
  }
};

export const listPedidos = async (req: Request, res: Response) => {
  const listPedidos = await pedidoService.getPedidos();

  res.status(200).json({ listPedidos });
};

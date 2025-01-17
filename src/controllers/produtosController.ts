import { Request, Response } from "express";
import z from "zod";
import { produtosService } from "../services/produtoService";
import { produtoBody } from "../utils/schemas";
export const createProduct = async (req: Request, res: Response) => {
  const body = req.body;

  const validateSchema = produtoBody.safeParse(body);

  if (!validateSchema.success)
    res.status(400).json({ msg: validateSchema.error.message });

  try {
    const produtoRegisterFinally = await produtosService.createProduct(body);
    res
      .status(200)
      .json({ msg: "Produto criado com sucesso", produtoRegisterFinally });
  } catch (err) {}
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await produtosService.listProducts();
    if (!products) res.status(400).json({ msg: "Erro ao encontrar produtos" });

    res.status(201).json({ msg: "Produtos encontrados", products });
  } catch (err) {
    console.error(err);
  }
};

export const getUniqueProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const toNumber = Number(id);
  if (!isNaN(toNumber)) {
    try {
      const productUnique = await produtosService.getUniqueProduct(toNumber);
      if (!productUnique)
        res.status(404).json({ msg: "Produto não encontrado" });

      res.status(201).json({ msg: "Produto encontrado", productUnique });
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(400).json({ msg: "ID inválido" });
  }
};

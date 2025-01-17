import { Prisma } from "@prisma/client";
import { db } from "../utils/Prisma";

export const produtosService = {
  createProduct: async (data: Prisma.ProdutoCreateInput) => {
    try {
      const productRegister = await db.produto.create({
        data: {
          nome: data.nome,
          preco_produto: data.preco_produto,
        },
      });
      return productRegister;
    } catch (err) {
      console.error(err);
    }
  },
  listProducts: async () => {
    try {
      const productList = await db.produto.findMany({
        select: {
          nome: true,
          preco_produto: true,
        },
      });
      return productList;
    } catch (err) {
      console.error(err);
    }
  },
  getUniqueProduct: async (id: number) => {
    try {
      const productUnique = await db.produto.findUnique({
        where: {
          id: id,
        },
      });
      return productUnique;
    } catch (err) {
      console.error(err);
    }
  },
  getManyProducts: async (ids: number[]) => {
    try {
      const manyProducts = await db.produto.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          id: true,
          nome: true,
          preco_produto: true,
        },
      });

      const productsMapped = manyProducts.map((products) => products);
      return productsMapped;
    } catch (err) {
      console.error(err);
    }
  },
};

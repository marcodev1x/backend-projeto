import { Prisma } from "@prisma/client";
import { db } from "../utils/Prisma";
import { produtosService } from "./produtoService";

interface ProductIdsType {
  produtoId: number;
  quantity: number;
}

export const pedidoService = {
  createPedido: async (userId: number, productIds: ProductIdsType[]) => {
    const produtoPrecos = await produtosService.getManyProducts(
      productIds.map((id) => id.produtoId)
    );

    if (produtoPrecos) {
      const valorPago = productIds.reduce((acc, { produtoId, quantity }) => {
        const produto = produtoPrecos.find((p) => p.id === produtoId);
        if (!produto) {
          throw new Error(`Produto com ID ${produtoId} não encontrado`);
        }
        return acc + produto.preco_produto * quantity;
      }, 0);

      try {
        const pedidoConnector = await db.pedido.create({
          data: {
            userId: userId,
            valor_pago: valorPago,
            status: "INDEFINIDO",
            produtos: {
              connect: productIds.map((id) => ({
                id: id.produtoId,
              })),
            },
          },
        });
        return pedidoConnector;
      } catch (err) {
        console.error(err);
      }
    }
  },
  getPedidos: async () => {
    try {
      const listPedidos = await db.pedido.findMany({
        select: {
          id: true,
          status: true,
          valor_pago: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          produtos: {
            select: {
              id: true,
              nome: true,
              preco_produto: true,
            },
          },
          userIdFK: {
            select: {
              email: true,
            },
          },
        },
      });
      return listPedidos;
    } catch (err) {
      console.error(err);
    }
  },
};

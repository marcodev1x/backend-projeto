import z from "zod";

export const produtoBody = z.object({
  nome: z.string(),
  preco_produto: z.number(),
});

export const pedidosBody = z.object({
  userId: z.number().positive().int(),
  productIds: z
    .object({
      produtoId: z.number(),
      quantity: z.number(),
    })
    .array(),
});

export const userBody = z.object({
  nome: z
    .string({ message: "O nome precisa ser um texto." })
    .min(2, { message: "É necessário um nome com dois caractéres ou mais" })
    .max(200),
  email: z.string().email({ message: "Formato de email inválido" }),
  age: z.number().positive({ message: "Números negativos não serão aceitos" }),
});

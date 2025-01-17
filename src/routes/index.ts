import express from "express";
import usersRouter from "./user";
import produtosRouter from "./produto";
import pedidoRouter from "./pedido";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/user", usersRouter);
router.use("/produtos", produtosRouter);
router.use("/shipment", pedidoRouter);

export default router;

import express from "express";
import { listPedidos, registerPedidos } from "../controllers/pedidosController";
const pedidoRouter = express.Router();

pedidoRouter.post("/create", registerPedidos);
pedidoRouter.get("/list", listPedidos);
export default pedidoRouter;

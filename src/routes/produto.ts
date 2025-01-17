import express from "express";
import {
  createProduct,
  getProducts,
  getUniqueProduct,
} from "../controllers/produtosController";

const produtosRouter = express.Router();

produtosRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

produtosRouter.post("/register", createProduct);
produtosRouter.get("/list", getProducts);
produtosRouter.get("/:id", getUniqueProduct);

export default produtosRouter;

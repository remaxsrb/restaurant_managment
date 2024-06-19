import express from "express";
import { CartController } from "../controllers/cart";
const cartRouter = express.Router();

cartRouter.route("/add").post((req, res) => new CartController().add(req, res));

cartRouter
  .route("/clear")
  .post((req, res) => new CartController().clear(req, res));

cartRouter
  .route("/items")
  .get((req, res) => new CartController().read(req, res));

export default cartRouter;

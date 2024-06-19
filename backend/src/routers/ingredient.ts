import express from "express";
import { IngredientController } from "../controllers/ingredient"; 
const ingredientRouter = express.Router();

ingredientRouter.route('/read_by_name').get(
    (req, res) => new IngredientController().readByName(req, res)
)

export default ingredientRouter;
import express from "express";
import { DishController } from "../controllers/dish"; 
const dishRouter = express.Router();

dishRouter.route('/create').post(
    (req, res) => new DishController().create(req, res)
)


dishRouter.route('/read_by_name').get(
    (req, res) => new DishController().readByName(req, res)
)




export default dishRouter;
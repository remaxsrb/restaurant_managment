import express from "express";
import { RestaurantTypeController } from "../controllers/restaurant_types"; 
const restaurantTypeRouter = express.Router();

restaurantTypeRouter.route('/create').post(
    (req, res) => new RestaurantTypeController().create(req, res)
)

restaurantTypeRouter.route('/by_name').get(
    (req, res) => new RestaurantTypeController().readByName(req, res)
)

restaurantTypeRouter.route('/all').get(
    (req, res) => new RestaurantTypeController().all(req, res)
)

export default restaurantTypeRouter;
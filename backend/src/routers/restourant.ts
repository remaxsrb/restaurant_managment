import express from "express";
import { RestaurantController } from "../controllers/restaurant"; 
const restaurantRouter = express.Router();

restaurantRouter.route('/create').post(
    (req, res) => new RestaurantController().create(req, res)
)

restaurantRouter.route('/all').get(
    (req, res) => new RestaurantController().all(req, res)
)

restaurantRouter.route('/sort_by_name_asc').get(
    (req, res) => new RestaurantController().sortByNameAsc(req, res)
)

restaurantRouter.route('/sort_by_name_desc').get(
    (req, res) => new RestaurantController().sortByNameDesc(req, res)
)

restaurantRouter.route('/sort_by_address_asc').get(
    (req, res) => new RestaurantController().sortByAddressAsc(req, res)
)

restaurantRouter.route('/sort_by_address_desc').get(
    (req, res) => new RestaurantController().sortByAddressDesc(req, res)
)

restaurantRouter.route('/sort_by_type_asc').get(
    (req, res) => new RestaurantController().sortByTypeAsc(req, res)
)

restaurantRouter.route('/sort_by_type_desc').get(
    (req, res) => new RestaurantController().sortByTypeDesc(req, res)
)

restaurantRouter.route('/read_by_name/:name').get(
    (req, res) => new RestaurantController().readByName(req, res)
)

restaurantRouter.route('/read_by_address/:address').get(
    (req, res) => new RestaurantController().readByAddress(req, res)
)

restaurantRouter.route('/read_by_type/:type').get(
    (req, res) => new RestaurantController().readByType(req, res)
)

restaurantRouter.route('/add_dish').post(
    (req, res) => new RestaurantController().addDish(req, res)
)

restaurantRouter.route('/remove_dish').post(
    (req, res) => new RestaurantController().removeDish(req, res)
)


export default restaurantRouter;
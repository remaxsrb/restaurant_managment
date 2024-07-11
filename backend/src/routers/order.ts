import express from "express";
import { OrderController } from "../controllers/order"; 
const orderRouter = express.Router();

orderRouter.route('/create').post(
    (req, res) => new OrderController().create(req, res)
)

orderRouter.route('/read_by_status_pending').get(
    (req, res) => new OrderController().read_by_status_pending(res)
)

orderRouter.route('/read_by_status_accepted').get(
    (req, res) => new OrderController().read_by_status_accepted(res)
)

orderRouter.route('/read_by_status_rejected').get(
    (req, res) => new OrderController().read_by_status_rejected(res)
)


export default orderRouter;
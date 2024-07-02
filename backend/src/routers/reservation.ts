import express from "express";
import { ReservationController } from "../controllers/reservation"; 
const reservationRouter = express.Router();

reservationRouter.route('/create').post(
    (req, res) => new ReservationController().create(req, res)
)

reservationRouter.route('/read_by_status').get(
    (req, res) => new ReservationController().read_by_status(req, res)
)


export default reservationRouter;
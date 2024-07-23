import express from "express";
import Reservation from "../models/reservation";

export class ReservationController {
  async create(req: express.Request, res: express.Response) {
    const newReservation = req.body;
    //check if reservation is in valid time frame
    //time should ne within restaurant working hourse and at least 1
    try {
      await new Reservation(newReservation).save();
      console.log("Reservation created");
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating reservation" });
    }
  }

  async read_by_status_for_user(
    req: express.Request,
    errorMessage: string,
    res: express.Response
  ) {
    const username = req.params.username;
    const status = req.params.status;
    try {
      const reservations = await Reservation.find({ username, status });
      return res.json(reservations);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: errorMessage });
    }
  }

  read_by_status(req: express.Request, res: express.Response) {
    //Status can be either active or expired
    this.read_by_status_for_user(req, "Reservations not found for user", res);
  }
}

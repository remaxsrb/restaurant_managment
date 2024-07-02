import express from "express";
import Reservation from "../models/reservation";

export class ReservationController {
  create(req: express.Request, res: express.Response) {
    const new_reservation = req.body;

    new Reservation(new_reservation)
      .save()
      .then(() => {
        res.json({ message: "Reservation created" });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error creating reservation" });
      });
  }

  read_by_status_for_user(
    req: express.Request,
    errorMessage: string,
    res: express.Response
  ) {
    const username = req.params.username;
    const status = req.params.status;

    Reservation.find({ username, status })
      .then((reservations) => {
        res.json(reservations);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: errorMessage });
      });
  }

  read_by_status(req: express.Request, res: express.Response) {
    this.read_by_status_for_user(req, "Reservations not found for user", res);
  }
}

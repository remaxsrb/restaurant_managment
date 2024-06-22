import express from "express";
import { GuestController } from "./guest";
import { WaiterController } from "./waiter";
import Admin from "../models/admin";

export class AdminController {
  setGuestStatus = (req: express.Request, res: express.Response) => {
    new GuestController().updateStatus(req, res);
  };

  registerWaiter = (req: express.Request, res: express.Response) => {
    new WaiterController().register(req, res);
  };

  login(req: express.Request, res: express.Response) {
    Admin.findOne({ username: req.body.username, password: req.body.password })
      .then((admin) => {
        if (admin) {
          res.json(admin);
        } else {
          res.status(404).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error logging in" });
      });
  }
}

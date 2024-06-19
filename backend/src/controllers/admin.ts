import express from "express";
import { GuestController } from "./guest";
import { WaiterController } from "./waiter";

export class AdminController {
  setGuestStatus = (req: express.Request, res: express.Response) => {
    new GuestController().setStatus(req, res);
  };

  registerWaiter = (req: express.Request, res: express.Response) => {
    new WaiterController().register(req, res);
  };
}

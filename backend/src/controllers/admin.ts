import express from "express";
import { UserController } from "./user";

export class AdminController {
  setGuestStatus = (req: express.Request, res: express.Response) => {
    new UserController().updateStatus(req, res);
  };

  registerWaiter = (req: express.Request, res: express.Response) => {
    new UserController().register(req, res);
  };

  
}

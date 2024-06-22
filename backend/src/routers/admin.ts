import express from "express";
import { AdminController } from "../controllers/admin";

const adminRouter = express.Router();

adminRouter
  .route("/register_waiter")
  .post((req, res) => new AdminController().registerWaiter(req, res));

adminRouter
  .route("/set_guest_status")
  .post((req, res) => new AdminController().setGuestStatus(req, res));

adminRouter
  .route("/login")
  .post((req, res) => new AdminController().login(req, res));

export default adminRouter;

import express from "express";
import { AdminController } from "../controllers/admin"; 

const adminRouter = express.Router();

adminRouter.route('/registerwaiter').post(
    (req, res) => new AdminController().registerWaiter(req, res)
)

adminRouter.route('/activateuser').post(
    (req, res) => new AdminController().setGuestStatus(req, res)
)

adminRouter.route('/rejectuser').post(
    (req, res) => new AdminController().setGuestStatus(req, res)
)

adminRouter.route('/unblockguest').post(
    (req, res) => new AdminController().setGuestStatus(req, res)
)

adminRouter.route('/deactivate').post(
    (req, res) => new AdminController().setGuestStatus(req, res)
)

adminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
)




export default adminRouter;
import express from "express";
import { WaiterController } from "../controllers/waiter"; 
const waiterRouter = express.Router();

waiterRouter.route('/all').get(
    (req, res) => new WaiterController().all(req, res)
)


waiterRouter.route('/readbyusername/:username').get(
    (req, res) => new WaiterController().readByUsername(req, res)
)

waiterRouter.route('/readbyemail/:email').get(
    (req, res) => new WaiterController().readByEmail(req, res)
)

waiterRouter.route('/login').get(
    (req, res) => new WaiterController().login(req, res)
)
waiterRouter.route('/updatefirstname').post(
    (req, res) => new WaiterController().updateFirstname(req, res)
)
waiterRouter.route('/updatelastname').post(
    (req, res) => new WaiterController().updateLastname(req, res)
)
waiterRouter.route('/updateaddress').post(
    (req, res) => new WaiterController().updateAddress(req, res)
)
waiterRouter.route('/updateemail').post(
    (req, res) => new WaiterController().updateEmail(req, res)
)
waiterRouter.route('/updatecreditcardnumber').post(
    (req, res) => new WaiterController().updateCreditCardNumber(req, res)
)
waiterRouter.route('/updateprofilephoto').post(
    (req, res) => new WaiterController().updateProfilePhoto(req, res)
)
waiterRouter.route('/updatepassword').post(
    (req, res) => new WaiterController().updatePassword(req, res)
)


export default waiterRouter;
import express from "express";
import { GuestController } from "../controllers/guest"; 
const guestRouter = express.Router();

guestRouter.route('/register').post(
    (req, res) => new GuestController().register(req, res)
)

guestRouter.route('/readbyusername/:username').get(
    (req, res) => new GuestController().readByUsername(req, res)
)

guestRouter.route('/readbyemail/:email').get(
    (req, res) => new GuestController().readByEmail(req, res)
)

guestRouter.route('/login').post(
    (req, res) => new GuestController().login(req, res)
)
guestRouter.route('/updatefirstname').post(
    (req, res) => new GuestController().updateFirstname(req, res)
)
guestRouter.route('/updatelastname').post(
    (req, res) => new GuestController().updateLastname(req, res)
)
guestRouter.route('/updateaddress').post(
    (req, res) => new GuestController().updateAddress(req, res)
)
guestRouter.route('/updateemail').post(
    (req, res) => new GuestController().updateEmail(req, res)
)
guestRouter.route('/updatecreditcardnumber').post(
    (req, res) => new GuestController().updateCreditCardNumber(req, res)
)
guestRouter.route('/updateprofilephoto').post(
    (req, res) => new GuestController().updateProfilePhoto(req, res)
)
guestRouter.route('/updatepassword').post(
    (req, res) => new GuestController().updatePassword(req, res)
)

export default guestRouter;
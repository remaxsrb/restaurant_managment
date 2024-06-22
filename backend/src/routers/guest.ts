import express from "express";
import { GuestController } from "../controllers/guest"; 
const guestRouter = express.Router();

guestRouter.route('/all').get(
    (req, res) => new GuestController().all(req, res)
)

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
guestRouter.route('/update_firstname').post(
    (req, res) => new GuestController().updateFirstname(req, res)
)
guestRouter.route('/update_lastname').post(
    (req, res) => new GuestController().updateLastname(req, res)
)
guestRouter.route('/update_address').post(
    (req, res) => new GuestController().updateAddress(req, res)
)
guestRouter.route('/update_email').post(
    (req, res) => new GuestController().updateEmail(req, res)
)
guestRouter.route('/update_credit_card_number').post(
    (req, res) => new GuestController().updateCreditCardNumber(req, res)
)
guestRouter.route('/update_profile_photo').post(
    (req, res) => new GuestController().updateProfilePhoto(req, res)
)
guestRouter.route('/update_password').post(
    (req, res) => new GuestController().updatePassword(req, res)
)



export default guestRouter;
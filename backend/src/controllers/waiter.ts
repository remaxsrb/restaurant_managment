import express from "express";
import Waiter from "../models/waiter";

export class WaiterController {
  register(req: express.Request, res: express.Response) {
    Waiter.create(req.body)
      .then(() => {
        res.json({ message: "Waiter created" });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(400)
          .json({ message: "Waiter with given name or email already exists" });
      });
  }

  private readWaiterByField(
    field: string,
    value: string,
    errorMessage: string,
    res: express.Response
  ) {
    Waiter.findOne({ [field]: value })
      .then((waiter) => {
        if (waiter) {
          res.json(waiter);
        } else {
          res.status(404).json({ message: errorMessage });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: errorMessage });
      });
  }

  readByUsername(req: express.Request, res: express.Response) {
    this.readWaiterByField("username", req.body.username, "No such user", res);
  }

  readByEmail(req: express.Request, res: express.Response) {
    this.readWaiterByField("email", req.body.email, "No such user", res);
  }

  login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;
    Waiter.findOne({ username, password })
      .then((waiter) => {
        if (waiter) {
          res.json(waiter);
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error logging in" });
      });
  }

  private updateField(
    field: string,
    value: string,
    update: object,
    successMessage: string,
    errorMessage: string,
    res: express.Response
  ) {
    Waiter.updateOne({ [field]: value }, update)
      .then((result) => {
        if (result.modifiedCount === 1) {
          res.json({ message: successMessage });
        } else {
          res.status(404).json({ message: errorMessage });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: errorMessage });
      });
  }

  updateFirstname(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { firstname: req.body.firstname },
      "Firstname updated",
      "Error updating firstname",
      res
    );
  }

  updateLastname(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { lastname: req.body.lastname },
      "Lastname updated",
      "Error updating lastname",
      res
    );
  }

  updateAddress(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { address: req.body.address },
      "Address updated",
      "Error updating address",
      res
    );
  }

  updatePhoneNumber(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { phone_number: req.body.phone_number },
      "Phone number updated",
      "Error updating phone number",
      res
    );
  }

  updateEmail(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { email: req.body.email },
      "Email updated",
      "Error updating email",
      res
    );
  }

  updateCreditCardNumber(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { credit_card_number: req.body.credit_card_number },
      "Card number updated",
      "Error updating credit card number",
      res
    );
  }

  updateProfilePhoto(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { profile_photo: req.body.profile_photo },
      "Profile photo updated",
      "Error updating profile photo",
      res
    );
  }

  updatePassword(req: express.Request, res: express.Response) {
    this.updateField(
      "username",
      req.body.username,
      { password: req.body.password },
      "Password updated",
      "Error updating password",
      res
    );
  }

  all(req: express.Request, res: express.Response) {
    Waiter.find({})
      .then((waiter) => {
        res.json(waiter);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

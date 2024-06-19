import express from "express";
import Guest from "../models/guest";
import Cart from "../models/cart";

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class GuestController {
  register(req: express.Request, res: express.Response) {
    const guest = {
      username: req.body.username,
      password: req.body.password,
      security_question: req.body.security_question,
      security_question_answer: req.body.security_question_answer,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      address: req.body.address,
      phone_number: req.body.phone_number,
      email: req.body.email,
      credit_card_number: req.body.credit_card_number,
      profile_photo: req.body.profile_photo,
    };

    // Check if username is already taken
    Guest.findOne({ username: guest.username })
      .then(existingUser => {
        if (existingUser) {
          throw new HttpError('Username already exists', 409); // Conflict
        }

        // Check if email is already taken
        return Guest.findOne({ email: guest.email });
      })
      .then(existingEmail => {
        if (existingEmail) {
          throw new HttpError('Email already exists', 409); // Conflict
        }

        // Create new guest
        return new Guest(guest).save();
      })
      .then(savedGuest => {
        // Create new cart for the guest
        const newCart = new Cart({
          username: savedGuest.username,
          items: [],
        });
        return newCart.save();
      })
      .then(() => {
        res.json({ message: "Guest created" });
      })
      .catch(err => {
        console.error(err);
        const statusCode = err.status || 500; // Default to 500 Internal Server Error
        const message = err.message || "Error creating guest";
        res.status(statusCode).json({ message });
      });
  }

  readByUsername(req: express.Request, res: express.Response) {
    Guest.findOne({ username: req.params.username })
      .then((guest) => {
        if (guest) {
          res.json(guest);
        } else {
          res.status(404).json({ message: "No such user" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error finding user" });
      });
  }

  readByEmail(req: express.Request, res: express.Response) {
    Guest.findOne({ email: req.params.email })
      .then((guest) => {
        if (guest) {
          res.json(guest);
        } else {
          res.status(404).json({ message: "No such user" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error finding user" });
      });
  }

  login(req: express.Request, res: express.Response) {
    Guest.findOne({ username: req.body.username, password: req.body.password })
      .then((guest) => {
        if (guest) {
          res.json(guest);
        } else {
          res.status(404).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error logging in" });
      });
  }

  private updateField(
    req: express.Request,
    res: express.Response,
    fieldToUpdate: string,
    updateValue: any,
    successMessage: string,
    errorMessage: string
  ) {
    const updateQuery = { username: req.body.username };
    const update = { [fieldToUpdate]: updateValue };
    Guest.updateOne(updateQuery, update)
      .then(() => {
        res.json({ message: successMessage });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: errorMessage });
      });
  }

  updateFirstname(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "firstname",
      req.body.firstname,
      "Firstname updated",
      "Error updating firstname"
    );
  }

  updateLastname(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "lastname",
      req.body.lastname,
      "Lastname updated",
      "Error updating lastname"
    );
  }

  updateAddress(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "address",
      req.body.address,
      "Address updated",
      "Error updating address"
    );
  }

  updatePhoneNumber(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "phone_number",
      req.body.phone_number,
      "Phone number updated",
      "Error updating phone number"
    );
  }

  updateEmail(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "email",
      req.body.email,
      "Email updated",
      "Error updating email"
    );
  }

  updateCreditCardNumber(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "credit_card_number",
      req.body.credit_card_number,
      "Card number updated",
      "Error updating credit card number"
    );
  }

  updateProfilePhoto(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "profile_photo",
      req.body.profile_photo,
      "Profile photo updated",
      "Error updating profile photo"
    );
  }

  updatePassword(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "password",
      req.body.password,
      "Password updated",
      "Error updating password"
    );
  }

  setStatus(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "status",
      req.body.status,
      "Status updated",
      "Error updating status"
    );
  }
}

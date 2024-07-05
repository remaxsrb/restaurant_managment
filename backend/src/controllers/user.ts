import express from "express";
import User from "../models/user";
import Cart from "../models/cart";
import jwt_service from "../utilities/jwt";

export class UserController {
  private checkExistingUser(username: string, email: string) {
    return User.findOne({ $or: [{ username }, { email }] }).then(
      (existingUser) => {
        if (existingUser) {
          if (existingUser.username === username) {
            return Promise.reject({
              status: 408,
              message: "Username already taken",
            });
          } else if (existingUser.email === email) {
            return Promise.reject({
              status: 409,
              message: "Email already taken",
            });
          }
        }
        return Promise.resolve();
      }
    );
  }

  private createShoppingCart(username: string) {
    const shoppingCart = new Cart({ username, items: [] });
    return shoppingCart.save();
  }

  register(req: express.Request, res: express.Response) {
    this.checkExistingUser(req.body.username, req.body.email)
      .then(() => User.create(req.body))
      .then((user) => this.createShoppingCart(user.username))
      .then(() => {
        res.json({ message: "User and shopping cart created" });
      })
      .catch((err) => {
        console.error(err);
        const statusCode = err.status || 500; // Default to 500 Internal Server Error
        const message = err.message || "Error creating user";
        res.status(statusCode).json({ message });
      });
  }

  login(req: express.Request, res: express.Response) {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          if (user.password === req.body.password) {

            //!!add check if user is approved
            
            // Client-side hashed password comparison
            const token = jwt_service.generate_token(user);
            const { password, ...user_data } = user.toObject();
            res.status(200).json({ token, user: user_data });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error logging in" });
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

    //if a username or email are taken by another user return error codes and reject a promise otherwise proceed to updating

    const checkQuery =
      fieldToUpdate === "username"
        ? User.findOne({ username: updateValue }).then((existingUser) => {
            if (existingUser) {
              return Promise.reject({
                status: 408,
                message: "Username is already taken",
              });
            }
          })
        : fieldToUpdate === "email"
        ? User.findOne({ email: updateValue }).then((existingUser) => {
            if (existingUser) {
              return Promise.reject({
                status: 409,
                message: "Email is already taken",
              });
            }
          })
        : Promise.resolve();

    checkQuery.then(() => {
      const updateQuery = { username: req.body.username };
      const update = { [fieldToUpdate]: updateValue };

      User.updateOne(updateQuery, update)
        .then((result) => {
          if (result.modifiedCount > 0) {
            res.json({ message: successMessage });
          } else {
            res
              .status(404)
              .json({ message: "User not found or no changes made" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: errorMessage });
        });
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

  updateUsername(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "username",
      req.body.username,
      "Username updated",
      "Error updating username"
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

  updateStatus(req: express.Request, res: express.Response) {
    this.updateField(
      req,
      res,
      "status",
      req.body.new_status,
      "Status updated",
      "Error updating status"
    );
  }

  private readUserByField(
    field: string,
    value: string,
    errorMessage: string,
    res: express.Response
  ) {
    User.findOne({ [field]: value })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: errorMessage });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: errorMessage });
      });
  }

  private readUsersByField(
    field: string,
    value: string,
    errorMessage: string,
    res: express.Response
  ) {
    User.find({ [field]: value })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: errorMessage });
      });
  }

  private countUsersByField(
    field: string,
    value: string,
    errorMessage: string,
    res: express.Response
  ) {
    User.countDocuments({ [field]: value })
      .then((count) => {
        res.json({ count });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: errorMessage });
      });
  }

  readByUsername(req: express.Request, res: express.Response) {
    this.readUserByField(
      "username",
      req.params.username,
      "User not found",
      res
    );
  }

  readByEmail(req: express.Request, res: express.Response) {
    this.readUserByField("email", req.params.email, "User not found", res);
  }

  readByRole(req: express.Request, res: express.Response) {
    const { role } = req.params;
    this.readUsersByField(
      "role",
      role,
      `No users of role '${role}' found`,
      res
    );
  }
  check_question(req: express.Request, res: express.Response) {
    console.log(req.body);
    const { username, security_question, security_question_answer } = req.body;

    // First check if the user exists by username
    User.findOne({ username })
      .then((existingUser) => {
        if (!existingUser) {
          // User does not exist
          return res.status(404).json({ message: "User not found" });
        }

        // User exists, now check if the security question matches
        if (existingUser.security_question !== security_question) {
          // Security question does not match
          return res
            .status(400)
            .json({ message: "Security question does not match" });
        }

        // Security question matches, now check if the security question answer matches
        if (
          existingUser.security_question_answer !== security_question_answer
        ) {
          // Security question answer does not match
          return res
            .status(401)
            .json({ message: "Security answer is incorrect" });
        }

        // All checks passed
        return res.status(200).json({ message: "Security check passed" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  }

  count(req: express.Request, res: express.Response) {
    const { role } = req.params;
    this.countUsersByField(
      "role",
      role,
      `No users of role '${role}' found`,
      res
    );
  }
}

export default new UserController();

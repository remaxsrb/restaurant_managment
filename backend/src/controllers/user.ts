import express from "express";
import User from "../models/user";
import Cart from "../models/cart";

import jwt_service from "../utilities/jwt";
import bcrypt from "bcryptjs";

export class UserController {
  private async checkExistingUser(username: string, email: string) {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        throw { status: 408, message: "Username already taken" };
      } else if (existingUser.email === email) {
        throw { status: 409, message: "Email already taken" };
      }
    }
  }

  private async createShoppingCart(username: string) {
    const shoppingCart = new Cart({ username, items: [] });
    await shoppingCart.save();
  }

  async register(req: express.Request, res: express.Response) {
    try {
      await this.checkExistingUser(req.body.username, req.body.email);

      const salt = bcrypt.genSaltSync(10);
      const hashed_password = bcrypt.hashSync(req.body.password, salt);

      req.body.password = hashed_password;

      const user = await User.create(req.body);
      await this.createShoppingCart(user.username);
      return res.json({ message: "User and shopping cart created" });
    } catch (err: any) {
      const statusCode = err.status || 500;
      const message = err.message || "Error creating user";
      return res.status(statusCode).json({ message });
    }
  }

  async login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });

      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.status !== "approved")
        return res.status(402).json({ message: "User is not approved" });

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt_service.generate_token(user);
      const { password: _, ...user_data } = user.toObject();
      return res.status(200).json({ token, user: user_data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error logging in" });
    }
  }

  private async updateField(
    req: express.Request,
    res: express.Response,
    fieldToUpdate: string,
    updateValue: any,
    successMessage: string,
    errorMessage: string
  ) {
    try {
      if (fieldToUpdate === "username") {
        const existingUser = await User.findOne({ username: updateValue });
        if (existingUser) {
          throw { status: 408, message: "Username is already taken" };
        }
      } else if (fieldToUpdate === "email") {
        const existingUser = await User.findOne({ email: updateValue });
        if (existingUser) {
          throw { status: 409, message: "Email is already taken" };
        }
      }

      const updateQuery = { username: req.body.username };
      const update = { [fieldToUpdate]: updateValue };

      const result = await User.updateOne(updateQuery, update);
      if (result.modifiedCount > 0) {
        return res.json({ message: successMessage });
      } else {
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }
    } catch (err: any) {
      const statusCode = err.status || 500;
      const message = err.message || "Error creating user";
      return res.status(statusCode).json({ message });
    }
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

  private async readUserByField(
    field: string,
    value: string,
    errorMessage: string,
    res: express.Response
  ) {
    try {
      const user = await User.findOne({ [field]: value });
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ message: errorMessage });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: errorMessage });
    }
  }

  private async readUsersByField(
    field: string,
    value: string,
    errorMessage: string,
    res: express.Response
  ) {
    try {
      const users = await User.find({ [field]: value });
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: errorMessage });
    }
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

  async check_question(req: express.Request, res: express.Response) {
    try {
      const { username, security_question, security_question_answer } =
        req.body;
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      if (existingUser.security_question !== security_question) {
        return res
          .status(400)
          .json({ message: "Security question does not match" });
      }
      if (existingUser.security_question_answer !== security_question_answer) {
        return res
          .status(401)
          .json({ message: "Security answer is incorrect" });
      }
      return res.status(200).json({ message: "Security check passed" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  private async countUsersByField(
    field: string,
    value: string,
    errorMessage: string,
    res: express.Response
  ) {
    try {
      const count = await User.countDocuments({ [field]: value });
      return res.json({ count });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: errorMessage });
    }
  }


  count_by_role(req: express.Request, res: express.Response) {
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

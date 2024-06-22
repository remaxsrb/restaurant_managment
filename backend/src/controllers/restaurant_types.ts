import express from "express";
import RestaurantType from "../models/restaurant_type";

export class RestaurantTypeController {
  create(req: express.Request, res: express.Response) {
    let restaurant_type = { name: req.body.name };

    new RestaurantType(restaurant_type)
      .save()
      .then(() => {
        res.json({ message: "Restaurant type created" });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(400)
          .json({ message: "Restaurant type with given name already exists" });
      });
  }

  readByName(req: express.Request, res: express.Response) {
    RestaurantType.findOne({ name: req.body.name })
      .then((restaurant_type) => {
        if (restaurant_type) {
          res.json(restaurant_type);
        } else {
          res.status(404).json({ message: "No such restaurant type" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error finding restaurant type" });
      });
  }

  all(req: express.Request, res: express.Response) {
    RestaurantType.find({})
      .sort({ name: 1 })
      .then((restaurant_types) => {
        res.json(restaurant_types);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

import express from "express";
import RestaurantType from "../models/restaurant_type";

export class RestaurantTypeController {
  async create(req: express.Request, res: express.Response) {
    try {
      let restaurant_type = { name: req.body.name };
      await new RestaurantType(restaurant_type).save();
      res.json({ message: "Restaurant type created" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Restaurant type with given name already exists" });
    }
  }

  async readByName(req: express.Request, res: express.Response) {
    try {
      const restaurant_type = await RestaurantType.findOne({ name: req.body.name });
      if (restaurant_type) {
        res.json(restaurant_type);
      } else {
        res.status(404).json({ message: "No such restaurant type" });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error finding restaurant type" });
    }
  }

  async all(req: express.Request, res: express.Response) {
    try {
      const restaurant_types = await RestaurantType.find({});
      res.json(restaurant_types);
    } catch (err) {
      console.log(err);
    }
  }
}

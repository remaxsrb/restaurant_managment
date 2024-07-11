import express from "express";
import Dish from "../models/dish";

export class DishController {
  async create(req: express.Request, res: express.Response): Promise<express.Response> {

    const {new_dish} = req.body

    try {
      await new Dish(new_dish).save();
      return res.json({ message: "Dish created" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Dish with given name already exists" });
    }
  }

  async readByName(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const dish = await Dish.findOne({ name: req.body.name });
      if (dish) {
        return res.json(dish);
      } else {
        return res.status(404).json({ message: "No such dish" });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Error finding dish" });
    }
  }
}

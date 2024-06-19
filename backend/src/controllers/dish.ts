import express from "express";
import Dish from "../models/dish";

export class DishController {
  create(req: express.Request, res: express.Response) {
    let dish = {
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
    };

    new Dish(dish)
      .save()
      .then(() => {
        res.json({ message: "Dish created" });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(400)
          .json({ message: "Dish with given name already exists" });
      });
  }

  readByName(req: express.Request, res: express.Response) {
    Dish.findOne({ name: req.body.name })
      .then((dish) => {
        if (dish) {
          res.json(dish);
        } else {
          res.status(404).json({ message: "No such dish" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error finding dish" });
      });
  }
}

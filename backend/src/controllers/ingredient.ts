import express from "express";
import Ingredient from "../models/ingredient";

export class IngredientController {
  all(req: express.Request, res: express.Response) {
    Ingredient
      .find({})
      .sort({ name: 1 })
      .then((ingredients) => {
        res.json(ingredients);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  readByName(req: express.Request, res: express.Response) {
    Ingredient.findOne({ name: req.body.name })
      .then((ingredient) => {
        if (ingredient) {
          res.json(ingredient);
        } else {
          res.status(404).json({ message: "No such ingredient" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "Error finding ingredient" });
      });
  }
}

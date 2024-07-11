import express from "express";
import Restaurant from "../models/restaurant";

export class RestaurantController {
  async create(req: express.Request, res: express.Response) {
    const restaurant = req.body;
    try {
      await new Restaurant(restaurant).save();
      console.log("Restaurant created");
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ message: "Restaurant with given name already exists" });
    }
  }

  async all(req: express.Request, res: express.Response) {
    try {
      const restaurants = await Restaurant.find({}).sort({ name: 1 });
      return res.json(restaurants);
    } catch (err) {
      console.error(err);
    }
  }

  private async sortByField(
    req: express.Request,
    res: express.Response,
    fieldToSort: string,
    direction: "asc" | "desc",
    errorMessage: string
  ) {
    const sortOptions: { [field: string]: "asc" | "desc" | 1 | -1 } = {
      [fieldToSort]: direction === "desc" ? -1 : 1,
    };
    try {
      const results = await Restaurant.find({}).sort(sortOptions).exec();
      if (results.length > 0) return res.json(results);
      else console.log("No documents found");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: errorMessage });
    }
  }

  private async readByField(
    req: express.Request,
    res: express.Response,
    fieldToSearch: string,
    errorMessage: string
  ) {
    const valueToSearch = req.query[fieldToSearch];

    if (!valueToSearch) {
      res
        .status(400)
        .json({ message: `Missing query parameter: ${fieldToSearch}` });
      return;
    }

    try {
      const restaurant = await Restaurant.findOne({
        [fieldToSearch]: valueToSearch,
      });
      if (restaurant) return res.json(restaurant);
      else return res.status(404).json({ message: "Restaurant not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: errorMessage });
    }
  }

  sort_by_name_asc(req: express.Request, res: express.Response) {
    this.sortByField(req, res, "name", "asc", "Internal server error");
  }

  sort_by_name_desc(req: express.Request, res: express.Response) {
    this.sortByField(req, res, "name", "desc", "Internal server error");
  }

  sort_by_address_asc(req: express.Request, res: express.Response) {
    this.sortByField(req, res, "address", "asc", "Internal server error");
  }

  sort_by_address_desc(req: express.Request, res: express.Response) {
    this.sortByField(req, res, "address", "desc", "Internal server error");
  }

  sort_by_type_asc(req: express.Request, res: express.Response) {
    this.sortByField(req, res, "type", "asc", "Internal server error");
  }

  sort_by_type_desc(req: express.Request, res: express.Response) {
    this.sortByField(req, res, "type", "desc", "Internal server error");
  }
  readByName(req: express.Request, res: express.Response) {
    this.readByField(req, res, "name", "Restaurant with such name not found");
  }

  readByAddress(req: express.Request, res: express.Response) {
    this.readByField(
      req,
      res,
      "address",
      "Restaurant with such address not found"
    );
  }

  readByType(req: express.Request, res: express.Response) {
    this.readByField(req, res, "type", "Restaurant with such type not found");
  }

  async addDish(req: express.Request, res: express.Response) {
    const name = req.body.name;
    const dish = req.body.dish;

    try {
      const restaurant = await Restaurant.findOneAndUpdate(
        { username: name },
        { $push: { dishes: dish } },
        { new: true }
      );
      return res.json({ message: "Dish added successfully", restaurant });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while adding the dish" });
    }
  }

  async removeDish(req: express.Request, res: express.Response) {
    const name = req.body.name;
    const dish = req.body.dish;

    try {
      const restaurant = await Restaurant.findOneAndUpdate(
        { username: name },
        { $pull: { dishes: { name: dish.name } } },
        { new: true }
      );
      return res.json({ message: "Dish removed successfully", restaurant });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while removing the dish" });
    }
  }
}

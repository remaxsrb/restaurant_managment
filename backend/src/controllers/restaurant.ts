import express from "express";
import Restaurant from "../models/restaurant";

export class RestaurantController {
  create(req: express.Request, res: express.Response) {
    let restaurant = {
      name: req.body.name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      type: req.body.type,
      location: req.body.location,
      email: req.body.email,
      description: req.body.description,
      floor_plan: req.body.floor_plan,

    };

    new Restaurant(restaurant)
      .save()
      .then(() => {
        res.json({ message: "Restaurant created" });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(400)
          .json({ message: "Restaurant with given name already exists" });
      });
  }

  all(req: express.Request, res: express.Response) {
    Restaurant
      .find({})
      .sort({ name: 1 })
      .then((restaurants) => {
        res.json(restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private sortByFieldDesc(
    req: express.Request,
    res: express.Response,
    fieldToRead: string,
    errorMessage: string
  ) {
    const sortOptions: { [field: string]: "asc" | "desc" | 1 | -1 } = {
      [fieldToRead]: -1,
    };
    Restaurant.find({})
      .sort(sortOptions)
      .exec()
      .then((results) => {
        if (results.length > 0) {
          res.json(results);
        } else {
          res.status(404).json({ message: "No documents found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: errorMessage });
      });
  }

  private sortByFieldAsc(
    req: express.Request,
    res: express.Response,
    fieldToRead: string,
    errorMessage: string
  ) {
    const sortOptions: { [field: string]: "asc" | "desc" | 1 | -1 } = {
      [fieldToRead]: 1,
    };
    Restaurant.find({})
      .sort(sortOptions)
      .exec()
      .then((results) => {
        if (results.length > 0) {
          res.json(results);
        } else {
          res.status(404).json({ message: "No documents found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: errorMessage });
      });
  }

  private readByField(
    req: express.Request,
    res: express.Response,
    fieldToSearch: string,
    errorMessage: string
  ) {
    const valueToSearch = req.query[fieldToSearch];
  
    if (!valueToSearch) {
      res.status(400).json({ message: `Missing query parameter: ${fieldToSearch}` });
      return;
    }

    Restaurant.findOne({valueToSearch})
      .then((restourant) => {
        if (restourant) {
          res.json(restourant);
        } else {
          res.status(404).json({ message: "Restourant not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: errorMessage });
      });
  }
  
  sortByNameAsc(req: express.Request, res: express.Response) {
    this.sortByFieldAsc(req, res, "name", "Internal server error");
  }

  sortByAddressAsc(req: express.Request, res: express.Response) {
    this.sortByFieldAsc(req, res, "address", "Internal server error");
  }

  sortByTypeAsc(req: express.Request, res: express.Response) {
    this.sortByFieldAsc(req, res, "type", "Internal server error");
  }

  sortByNameDesc(req: express.Request, res: express.Response) {
    this.sortByFieldDesc(req, res, "name", "Internal server error");
  }

  sortByAddressDesc(req: express.Request, res: express.Response) {
    this.sortByFieldDesc(req, res, "address", "Internal server error");
  }

  sortByTypeDesc(req: express.Request, res: express.Response) {
    this.sortByFieldDesc(req, res, "type", "Internal server error");
  }

  readByName(req: express.Request, res: express.Response) {
    this.readByField(req, res, "name", "Restourant with such name not found");
  }

  readByAddress(req: express.Request, res: express.Response) {
    this.readByField(req, res, "address", "Restourant with such address not found");
  }

  readByType(req: express.Request, res: express.Response) {
    this.readByField(req, res, "type", "Restourant with such type not found");

  }

  addDish(req: express.Request, res: express.Response) {
    const name = req.body.name;
    const dish = req.body.dish;

    Restaurant.findOneAndUpdate(
      { username: name },
      { $push: { dishes: dish } },
      { new: true }
    )
      .then((restaurant) => {

        res.json({ message: "Dish addedd successfully", restaurant });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "An error occurred while adding the dish" });
      });
  }

  

  removeDish(req: express.Request, res: express.Response) {
    const name = req.body.name;
    const dish = req.body.dish;

    Restaurant.findOneAndUpdate(
      { username: name },
      { $pull: { dishes: {name: dish.name} } },
      { new: true }
    )
      .then((restaurant) => {

        res.json({ message: "Dish removed successfully", restaurant });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "An error occurred while removing the dish" });
      });
  }
}

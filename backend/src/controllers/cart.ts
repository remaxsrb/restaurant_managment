import express from "express";
import Cart from "../models/cart";
import { CartItem } from "../models/cart_item";

export class CartController {
  clear(req: express.Request, res: express.Response) {
    const username = req.body.username;

    Cart.findOneAndUpdate(
      { username: username },
      { $set: { items: [] } },
      { new: true }
    )
      .then((cart) => {
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        res.json({ message: "Cart emptied successfully", cart });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "An error occurred while emptying the cart" });
      });
  }

  add(req: express.Request, res: express.Response) {
    const username = req.body.username;
    const items: CartItem[] = req.body.items;

    Cart.findOne({ username })
      .then((cart) => {
        items.forEach((item) => {
          const newItem = {
            dishId: item.dishId,
            quantity: item.quantity,
            price: item.price,
          };
          cart.items.push(newItem);
        });

        return cart.save();
      })
      .then((savedCart) => {
        console.log("Items added to cart successfully:", savedCart);
        res.status(200).json(savedCart);
      })
      .catch((err) => {
        console.error("Error adding items to cart:", err);
        res.status(500).json({ error: "Failed to add items to cart" });
      });
  }

  read(req: express.Request, res: express.Response) {
    const username = req.body.username;

    Cart.findOne({ username })
      .then((cart) => {
        res.status(200).json(cart.items);
      })
      .catch((err) => {
        console.error("Error fetching cart contents:", err);
        res.status(500).json({ error: "Failed to fetch cart contents" });
      });
  }
}

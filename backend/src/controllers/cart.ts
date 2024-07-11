import express from "express";
import Cart from "../models/cart";
import { CartItem } from "../models/interfaces/cart_item";

export class CartController {
  async clear(req: express.Request, res: express.Response) {
    const username = req.body.username;

    try {
      const cart = await Cart.findOneAndUpdate(
        { username: username },
        { $set: { items: [] } },
        { new: true }
      );

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      return res.json({ message: "Cart emptied successfully", cart });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while emptying the cart" });
    }
  }

  async add(req: express.Request, res: express.Response) {
    const username = req.body.username;
    const items: CartItem[] = req.body.items;

    try {
      const cart = await Cart.findOne({ username });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      items.forEach((item) => {
        const newItem = {
          dishId: item.dishId,
          quantity: item.quantity,
          price: item.price,
        };
        cart.items.push(newItem);
      });

      const savedCart = await cart.save();

      console.log("Items added to cart successfully:", savedCart);
      return res.status(200).json(savedCart);
    } catch (err) {
      console.error("Error adding items to cart:", err);
      return res.status(500).json({ error: "Failed to add items to cart" });
    }
  }

  async read(req: express.Request, res: express.Response) {
    const username = req.body.username;

    try {
      const cart = await Cart.findOne({ username });

      if (!cart) return res.status(404).json({ message: "Cart not found" });

      return res.status(200).json(cart.items);
    } catch (err) {
      console.error("Error fetching cart contents:", err);
      return res.status(500).json({ error: "Failed to fetch cart contents" });
    }
  }
}

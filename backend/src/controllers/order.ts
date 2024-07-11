import express from "express";
import order from "../models/order";

export class OrderController {
  async create(req: express.Request, res: express.Response) {
    const new_order = req.body;
    try {
      await new order(new_order).save();
      res.json({ message: "Order created" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Error creating order" });
    }
  }

  async read_by_status(
    status: String,
    errorMessage: string,
    res: express.Response
  ) {
    try {
      const orders = await order.find({ status });
      return res.json(orders);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: errorMessage });
    }
  }

  read_by_status_pending(res: express.Response) {
    this.read_by_status("pending", "orders not found for user", res);
  }

  read_by_status_accepted(res: express.Response) {
    this.read_by_status("accepted", "orders not found for user", res);
  }

  read_by_status_rejected(res: express.Response) {
    this.read_by_status("rejected", "orders not found for user", res);
  }

}

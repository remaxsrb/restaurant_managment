import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartItem = new Schema({
  dishId: {
    type: Schema.Types.ObjectId,
    ref: "Dish",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Cart = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    items: [CartItem],
  },
  { versionKey: false }
);

export default mongoose.model("Cart", Cart, "carts");

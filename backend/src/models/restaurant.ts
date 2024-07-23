import mongoose from "mongoose";
import { Address } from "./address";

const Schema = mongoose.Schema;

const Table = new Schema({
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["available", "reserved"],
  },
  capacity: {
    type: Number,
    required: true,
    min: 2,
  },
});

const Restaurant = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // not interested in a case when restaurant is a franchize so I am using restaurant name as primary key
    },
    phone_number: {
      type: String,
      required: true,
      match: /^06\d{7,8}$/,
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
    },
    type: {
      type: Schema.Types.Mixed,
      ref: "RestaurantType",
      required: true,
    },

    address: { type: Address, required: true },
    open: {
      type: Date,
      required: true,
    },
    close: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
      match: /\.json$/i,
    },
    tables: [Table],

    menu: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  },
  { versionKey: false }
);

export default mongoose.model("Restaurant", Restaurant, "restaurants");

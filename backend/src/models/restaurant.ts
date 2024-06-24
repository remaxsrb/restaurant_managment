import mongoose from "mongoose";
import Dish from "./dish";

const Schema = mongoose.Schema;

const Table = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const Restaurant = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // not interested in a case when restaurant is a franchize
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    open: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    close: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },

    description: {
      type: String,
      required: true,
    },
    floor_plan: {
      type: String,
      required: true,
    },
    tables: [Table],

    menu: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dish",

      },
    ],
  },
  { versionKey: false }
);

export default mongoose.model("Restaurant", Restaurant, "restaurants");

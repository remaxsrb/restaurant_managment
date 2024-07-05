import mongoose from "mongoose";
import Dish from "./dish";

const Schema = mongoose.Schema;

const Restaurant = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // not interested in a case when restaurant is a franchize
    },
    address: { type: String, ref: "Address" },
    phone_number: {
      type: String,
      required: true,
      match: /^06\d{8}$/
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/
    },
    type: {
      type: Schema.Types.ObjectId, 
      ref: "RestaurantType",
      required: true,
    },

    longitude: {
      type: Number,
      required: true
    },
    latidute: {
      type: Number,
      required: true
    },

    
    //Time is stored in a HH:MM formar as a string and on frontend it will be converted for calulations

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
    rating: {
      type: Number,
      required: true,
      default: 0,
      max: 5
    },
    description: {
      type: String,
      required: true,
    },
    floor_plan: {
      type: String,
      required: true,
      match: /\.json$/i
    },
    tables: [{id: String, capacity: Number, status: String}],

    menu: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  },
  { versionKey: false }
);

export default mongoose.model("Restaurant", Restaurant, "restaurants");

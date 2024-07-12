import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const Address = new Schema({
    street: {
      type: String,
      required: true,
    },
    street_number: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  });
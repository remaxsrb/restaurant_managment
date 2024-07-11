import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Address = new Schema({
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

const User = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      match: /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[\W_]).{6,10}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
    },
    role: { type: String, required: true, enum: ["admin", "waiter", "guest"] },
    security_question: { type: String },
    security_question_answer: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    address: { type: String, ref: "Address" },
    phone_number: { Address },
    credit_card_number: { type: String, match: /^\d{16}$/ },
    profile_photo: { type: String, match: /\.(png|jpg)$/i },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "blocked", "banned"],
    },
    late_for_reservation: { type: Number, default: 0, min: 0, max: 3 },
    restaurant: { type: String, ref: "Restaurant" },
  },
  { versionKey: false }
);

export default mongoose.model("User", User, "users");

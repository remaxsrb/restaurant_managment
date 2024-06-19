import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRouter from "./routers/admin";
import guestRouter from "./routers/guest";
import waiterRouter from "./routers/waiter";
import cartRouter from "./routers/cart";
import dish from "./models/dish";
import dishRouter from "./routers/dish";
import ingredientRouter from "./routers/ingredient";
import reservation from "./models/reservation";
import reservationRouter from "./routers/reservation";
import restaurantRouter from "./routers/restourant";
import restaurantTypeRouter from "./routers/restourant_types";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/db");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connection ok");
});

const router = express.Router();
router.use("/guest", guestRouter);
router.use("/waiter", waiterRouter);
router.use("/admin", adminRouter);
router.use("/cart", cartRouter);
router.use("/dish", dishRouter);
router.use("/ingredient", ingredientRouter);
router.use("/reservation", reservationRouter);
router.use("/restaurant", restaurantRouter);
router.use("/restaurant_type", restaurantTypeRouter);



app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
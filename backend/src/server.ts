import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import https from "https";
import fs from "fs";

import adminRouter from "./routers/admin";
import guestRouter from "./routers/guest";
import waiterRouter from "./routers/waiter";
import cartRouter from "./routers/cart";
import dishRouter from "./routers/dish";
import reservationRouter from "./routers/reservation";
import restaurantRouter from "./routers/restaurant";
import restaurantTypeRouter from "./routers/restaurant_types";
import userRouter from "./routers/user";
import path from "path";

const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/restorani");

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// SSL certificates

const certDir = path.join(__dirname, '../../', 'certificates');

const privateKey = fs.readFileSync(path.join(certDir, 'server-key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(certDir, 'server-cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Routers
const router = express.Router();
router.use("/user", userRouter);
router.use("/guest", guestRouter);
router.use("/waiter", waiterRouter);
router.use("/admin", adminRouter);
router.use("/cart", cartRouter);
router.use("/dish", dishRouter);
router.use("/reservation", reservationRouter);
router.use("/restaurant", restaurantRouter);
router.use("/restaurant_type", restaurantTypeRouter);

// Main route
app.use("/", router);

// HTTPS server
const httpsServer = https.createServer(credentials, app);
const PORT = 4000;
httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});

import express from "express";
import verifyToken from "../middleware/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyToken, placeOrder);

export default orderRouter;

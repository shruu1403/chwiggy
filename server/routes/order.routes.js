const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { placeOrder,getOrderHistory } = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.use(auth);

orderRouter.post("/place", placeOrder);
orderRouter.get("/history", getOrderHistory);

module.exports = { orderRouter };

const express = require("express");
const { getAllCoupons,getCouponRestaurants,getCouponsByRestaurant } = require("../controllers/coupon.controller");

const couponRoutes = express.Router();

couponRoutes.get("/", getAllCoupons);
couponRoutes.get("/:code/restaurants", getCouponRestaurants);
couponRoutes.get("/restaurant/:id", getCouponsByRestaurant);

module.exports = {couponRoutes};

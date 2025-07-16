const express = require("express");
const { getAllRestaurants , getMenuForRestaurant} = require("../controllers/restaurant.controller");

const restaurantRoutes = express.Router();

restaurantRoutes.get("/", getAllRestaurants);
restaurantRoutes.get("/:id/menu",getMenuForRestaurant)

module.exports = {restaurantRoutes};

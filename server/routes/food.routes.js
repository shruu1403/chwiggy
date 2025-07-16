const express = require("express");
const { getFoodItemsByCategory } = require("../controllers/food.controller");

const foodRouter = express.Router();

foodRouter.get("/", getFoodItemsByCategory);

module.exports = {foodRouter};

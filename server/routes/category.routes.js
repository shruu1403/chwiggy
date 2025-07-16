const express = require("express");
const { getAllCategories } = require("../controllers/category.controller");

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);

module.exports = {categoryRoutes};

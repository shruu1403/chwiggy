const express = require("express");
const { searchAll } = require("../controllers/search.controller");

const searchRouter = express.Router();

searchRouter.get("/", searchAll); // GET /api/search?q=...

module.exports = { searchRouter };

const mongoose = require("mongoose");
const { foodItemModel } = require("../models/foodItemModel");

const getFoodItemsByCategory = async (req, res) => {
  const { restaurantID, category } = req.query;

  if (!restaurantID || !category) {
    return res.status(400).json({ msg: "restaurantID and category are required" });
  }

  try {
    const items = await foodItemModel.find({
      restaurantID,
      category: { $regex: category, $options: "i" }, // simpler case-insensitive
    });

    res.status(200).json({ items });
  } catch (err) {
    console.error("Error fetching items by category:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getFoodItemsByCategory };

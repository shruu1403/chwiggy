const { foodItemModel } = require("../models/foodItemModel");
const { restaurantModel } = require("../models/restaurantModel");

const searchAll = async (req, res) => {
  const {q} = req.query;

  if (!q) {
    return res.status(400).send({ msg: "Search query missing" });
  }

  try {
    const regex = new RegExp(q, "i");

    const foodItems = await foodItemModel.find({
      $or:[{name: regex}, {category:regex}]
    }).populate("restaurantID").limit(20);

    // Remove duplicates by name (keep first occurrence)
    const uniqueFoodItems = [];
    const seenNames = new Set();
    for (const item of foodItems) {
      if (!seenNames.has(item.name)) {
        uniqueFoodItems.push(item);
        seenNames.add(item.name);
      }
    }

    const restaurants = await restaurantModel.find({
      $or:[{name:regex}, {categories:regex}]
    }).limit(20)

    res.status(200).json({foodItems: uniqueFoodItems, restaurants})

  } catch (err) {
    res.status(500).send({ msg: "Search failed", error: err.message });
  }
};

module.exports = { searchAll };

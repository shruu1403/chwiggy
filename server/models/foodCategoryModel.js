const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, default: "" }, // Unsplash image URL
},{
    versionKey:false
});

const foodCategoryModel = mongoose.model("FoodCategory", foodCategorySchema);

module.exports = { foodCategoryModel };

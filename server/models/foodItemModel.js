const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Parent category like "Pizza"
  restaurantID: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  price: { type: Number, required: true },
  isVeg: { type: Boolean, default: true },
  image: { type: String, default: "" },
},{
    versionKey:false
});

const foodItemModel = mongoose.model("FoodItem", foodItemSchema);

module.exports = { foodItemModel };

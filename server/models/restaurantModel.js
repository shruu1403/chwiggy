const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 4.0 },
  categories: [{ type: String, required: true }], // category names
  deliveryTime: { type: String },
  image:String,
},{
    versionKey:false
});

const restaurantModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = { restaurantModel };

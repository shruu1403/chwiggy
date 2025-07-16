const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  restaurantIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
},{
    versionKey:false
});

const couponModel = mongoose.model("Coupon", couponSchema);

module.exports = { couponModel };

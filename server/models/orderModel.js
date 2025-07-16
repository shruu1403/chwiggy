const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodItemID: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending",
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
    required: false,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };

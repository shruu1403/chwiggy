const { cartModel } = require("../models/cartModel");
const { orderModel } = require("../models/orderModel");
const {couponModel}=require("../models/couponModel")

const placeOrder = async (req, res) => {
  const userID = req.userID;
  const { couponCode } = req.body;
  try {
    const cartItems = await cartModel.find({ userID }).populate("foodItemID");

    if (cartItems.length === 0) {
      res.status(400).send({ msg: "cart is empty" });
    }
    const items = cartItems.map((item) => ({
      foodItemID: item.foodItemID._id,
      quantity: item.quantity,
      price: item.foodItemID.price,
    }));
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Get restaurant from the first foodItem (assuming all from same restaurant)
    const restaurantID = cartItems[0].foodItemID.restaurantID;

    let discountAmount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await couponModel.findOne({ code: couponCode });

      if (coupon) {
        const isValid = coupon.restaurantIDs.some(
          (id) => id.toString() === restaurantID.toString()
        );

        if (isValid) {
          discountAmount = coupon.discount;
          appliedCoupon = coupon._id;
        } else {
          return res
            .status(400)
            .send({ msg: "Coupon not valid for this restaurant" });
        }
      } else {
        return res.status(404).send({ msg: "Coupon not found" });
      }
    }

    const finalAmount = totalAmount - discountAmount;

    const newOrder = new orderModel({
      userID,
      items,
      totalAmount,
      finalAmount,
      coupon: appliedCoupon,
      discountAmount,
    });
    await newOrder.save();
    await cartModel.deleteMany({ userID });
    res.status(201).send({ msg: "order placed successfully", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "failed to place order", error: error.message });
  }
};


const getOrderHistory = async (req, res) => {
  const userID = req.userID;

  try {
    const orders = await orderModel.find({ userID })
       .populate({
        path: "items.foodItemID",
        model: "FoodItem",
        select: "name", // or "name image price" if needed
      }) // to get full food item info
      .sort({ createdAt: -1 }); // latest first

    res.status(200).send({ msg: "Order history fetched", orders });
  } catch (error) {
    res.status(500).send({ msg: "Failed to fetch orders", error: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrderHistory
};

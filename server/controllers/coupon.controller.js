const { couponModel } = require("../models/couponModel");

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find().populate("restaurantIDs");   //populate : replaces each restaurant Id with full restaurant object
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch coupons", error: err.message });
  }
};

const getCouponRestaurants = async (req, res) => {
  try {
    const coupon = await couponModel
      .findOne({ code: req.params.code })
      .populate("restaurantIDs");

    if (!coupon) {
      return res.status(404).send({ msg: "Coupon not found" });
    }

    res.status(200).send({
      msg: "Restaurants with this coupon",
      restaurants: coupon.restaurantIDs,
    });
  } catch (err) {
    res.status(500).send({ msg: "Error fetching restaurants", error: err.message });
  }
};
// 🍕 Get all coupons that apply to a restaurant
const getCouponsByRestaurant = async (req, res) => {
  try {
    const restaurantID = req.params.id;

    const coupons = await couponModel.find({ restaurantIDs: restaurantID });

    if (!coupons.length) {
      return res.status(404).send({ msg: "No coupons for this restaurant" });
    }

    res.status(200).send(coupons);
  } catch (err) {
    res.status(500).send({ msg: "Error fetching coupons", error: err.message });
  }
};


module.exports = { getAllCoupons,getCouponRestaurants,getCouponsByRestaurant };

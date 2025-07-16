const { blacklistModel } = require("../models/blacklistModel");
require("dotenv").config()
const jwt=require("jsonwebtoken")

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token);
  if (!token) return res.status(401).send({ msg: "Login required" });

  const found = await blacklistModel.findOne({ token });
  if (found) return res.status(403).send({ msg: "Please login again" });

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.userID = decoded.userID;
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("JWT Error:", err.message);
    res.status(403).send({ msg: "Invalid or expired token" });
  }
};

module.exports={auth}
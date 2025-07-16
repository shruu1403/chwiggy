const { userModel } = require("../models/userModel");
const { blacklistModel } = require("../models/blacklistModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const userexists = await userModel.findOne({ email });
    if (userexists) {
      res.status(400).send({ msg: "user already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ msg: "error while hashing the password" });
        } else {
          const user = new userModel({ email, password: hash, name});
          await user.save();
          res
            .status(200)
            .send({ msg: "new user has been registred", registeredUser: user });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Registration failed", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, decoded) => {
        if (decoded) {
          const token = jwt.sign(
            { userID: user._id, user: user.name},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          res
            .status(200)
            .send({ msg: "Login successful!", token: token, name: user.name});
        } else {
          res.status(200).send({ msg: "wrong password" });
        }
      });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Login failed", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token) {
      const blacklisted = new blacklistModel({ token });
      await blacklisted.save();
      res.status(200).send({ msg: "Logout successful" });
    } else {
      res.status(400).send({ msg: "Token missing" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Logout failed", error: err.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser };

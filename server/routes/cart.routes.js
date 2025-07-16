const {getCart,addToCart,updateCart,removeFromCart}=require("../controllers/cart.controller")
const express=require("express")
const {auth}=require("../middlewares/auth.middleware")

const cartRouter=express.Router()
cartRouter.use(auth)

cartRouter.post("/add",addToCart)
cartRouter.get("/",getCart)
cartRouter.patch("/update/:id",updateCart)
cartRouter.delete("/delete/:id",removeFromCart)

module.exports={cartRouter}


const {cartModel}=require("../models/cartModel")

const addToCart=async(req,res)=>{
    const {foodItemID,quantity}=req.body
    const userID=req.userID
    try {
        const existing =await cartModel.findOne({userID,foodItemID})
        if(existing){
            existing.quantity+=quantity
            await existing.save()
            return res.status(200).send({msg:"updated quantity", cart:existing})
        }
        const newCartItem=new cartModel({userID,foodItemID,quantity})
        await newCartItem.save()
        res.status(201).send({msg:"added to cart",cart:newCartItem})
    } catch (error) {
        res.status(500).send({msg:"error adding to cart", error:error.message})        
    }
}

const getCart=async(req,res)=>{
    const userID= req.userID
    try {
        const cartItems=await cartModel.find({userID}).populate("foodItemID")   //include full food items
        res.status(200).send(cartItems)
    } catch (error) {
        res.status(500).send({msg:"error fetching cart", error:error.message})
        
    }
}
const updateCart=async(req,res)=>{
    const {quantity}=req.body
    const userID=req.userID
    const {id}=req.params
    try {
        if(quantity<1){
            res.status(400).send({msg:"quantity should be atleast 1"})
        }
        const updateCartItem=await cartModel.findOneAndUpdate({_id:id,userID},{$set : {quantity}}, {new:true})
        if(!updateCartItem){
            res.status(404).send({msg:"cart item not found"})
        }
        res.status(200).send({msg:"quantity updated", item : updateCartItem})
    } catch (error) {
        res.status(500).send({msg:"error updating the quantity", error:error.message})
    }
}

const removeFromCart=async(req,res)=>{
    const userID=req.userID
    const {id}=req.params
    try {
        const userCart=await cartModel.find({userID})
        if(userCart.length===0){
            return res.status(400).send({msg:"cart is already empty"})
        }
        const deletedItem=await cartModel.findOneAndDelete({_id:id,userID})
        if(!deletedItem){
            return res.status(404).send({msg:"item not found in your cart"})
        }
        res.status(200).send({msg:"item removed from cart",item:deletedItem})
    } catch (error) {
        res.status(500).send({msg:"error removing item",error:error.message})
    }
}

module.exports={
    addToCart,getCart,removeFromCart,updateCart
}
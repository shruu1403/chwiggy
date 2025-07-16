const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    foodItemID:{type:mongoose.Schema.Types.ObjectId,ref:"FoodItem",required:true},
    quantity:{type:Number,default:1,min:1},
    addedAt:{type:Date,default:Date.now}

})

const cartModel=mongoose.model("Cart",cartSchema)
module.exports={cartModel}

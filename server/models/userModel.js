const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}


},{
    versionKey:false
})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}
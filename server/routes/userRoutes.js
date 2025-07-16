const express=require("express")
const {registerUser, loginUser,logoutUser}=require("../controllers/userController")
const {passCheck}=require("../middlewares/passcheck.middleware")


const userRouter=express.Router()

userRouter.post("/register",passCheck,registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/logout",logoutUser)

module.exports={userRouter}
const express=require("express")
const app=express()
app.use(express.json())
const dotenv=require("dotenv").config()
const PORT=process.env.PORT
const {connection}=require("./db")
const cors=require("cors")
const {userRouter}=require("./routes/userRoutes")
const passport=require("passport")
require("./auth/passport")
const {authRouter}=require("./routes/authRoutes")
const {cartRouter}=require("./routes/cart.routes")
const {orderRouter}=require("./routes/order.routes")
const {categoryRoutes} = require("./routes/category.routes");
const {restaurantRoutes} = require("./routes/restaurant.routes");
const {couponRoutes} = require("./routes/coupon.routes");
const { searchRouter } = require("./routes/search.routes");
const { foodRouter } = require("./routes/food.routes")



app.use(
  cors({
    origin: ["https://chwiggy.netlify.app"], // your frontend Netlify domain
    credentials: true,
  })
);


app.use("/api/users",userRouter)
app.use(passport.initialize())
app.use("/api/auth",authRouter)
app.use("/api/foods",foodRouter)
app.use("/api/categories", categoryRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/cart",cartRouter)
app.use("/api/orders",orderRouter)
app.use("/api/search", searchRouter);


app.get("/",(req,res)=>{
    res.send("chwiggy api running")
})


app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server running on port ${PORT} and db is also connected`)
    } catch (error) {
        console.log(error);
    }
})
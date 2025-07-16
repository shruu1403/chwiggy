const {restaurantModel}=require("../models/restaurantModel")
const {foodItemModel} =require("../models/foodItemModel")
const mongoose=require("mongoose")

const getAllRestaurants = async (req, res) => {
  try {
    const {category} = req.query;
    let filter = {};

    if (category) filter.categories = category;

    const restaurants = await restaurantModel.find(filter);
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch restaurants", error: err.message });
  }
};

const getMenuForRestaurant = async (req, res) => {
  try {
    const {id}=req.params
    const {isVeg,sortBy,order}=req.query
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({msg:"invalid restaurant id"})
    }
    const restaurant = await restaurantModel.findById(id);
    if(!restaurant){
      return res.status(404).json({msg:"restaurant not found"})
    }
    let filter={restaurantID:id}
    if(isVeg==="true") filter.isVeg=true
    if(isVeg==="false")filter.isVeg=false

    let sort={}
    if(sortBy==="price"){
      sort.price=order==="desc" ? -1 : 1

    }
       const items = await foodItemModel.find(filter).sort(sort);
       return res.status(200).json({restaurant,items})
  } catch (err) {
    res.status(500).send({ msg: "Error loading menu", error: err.message });
  }
};

module.exports = { getAllRestaurants,getMenuForRestaurant };
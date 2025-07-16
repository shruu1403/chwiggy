const {foodCategoryModel}=require("../models/foodCategoryModel")

const getAllCategories=async(req,res)=>{
    try {
        const categories=await foodCategoryModel.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message : "failed to fetch categories", error:error.message})
    }
}
module.exports={getAllCategories}
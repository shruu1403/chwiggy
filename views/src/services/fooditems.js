import { TESTING_URL } from "./api";


export const getFoodItemsByCategory=async(id,category)=>{
  try {
    const res=await fetch(`${TESTING_URL}/foods?restaurantID=${id}&category=${category}`)
    if(res.ok){
      return await res.json()
    }
  } catch (error) {
    console.log("error fetching restaurants by category",error);
  }
}  



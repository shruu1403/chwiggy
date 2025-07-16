import { TESTING_URL } from "./api";

export const getCoupons = async () => {
  try {
    const res = await fetch(`${TESTING_URL}/coupons`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log("error fetching coupons:", error);
  }
};

export const getTopFoodItems = async () => {
  try {
    const res = await fetch(`${TESTING_URL}/categories`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log("error fetching food items", error);
  }
};



export const getTopRestaurants = async () => {
  try {
    const res = await fetch(`${TESTING_URL}/restaurants`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log("error fetching restaurants:", error);
  }
};
export const getMenuByRestaurant = async (id,filters={}) => {
  try {
    const params=new URLSearchParams(filters).toString()
    const res = await fetch(`${TESTING_URL}/restaurants/${id}/menu?${params}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log("error fetching menu:", error);
  }
};
export const getCouponsByRestaurant = async (restaurantID) => {
  const res = await fetch(`${TESTING_URL}/coupons/restaurant/${restaurantID}`);
  if (!res.ok) throw new Error("Failed to fetch coupons");
  return await res.json();
};

export const getRestaurantsByCoupon=async(code)=>{
  try {
    const res=await fetch(`${TESTING_URL}/coupons/${code}/restaurants`)
    if(res.ok){
      const data=await res.json() 
      return data.restaurants
    }
  } catch (error) {
    console.log("error fetching restaurants");
    
  }
}

export const getRestaurantsByCategory=async(category)=>{
  try {
    const res=await fetch(`${TESTING_URL}/restaurants?category=${category}`)
    if(res.ok){
      return await res.json()
    }
  } catch (error) {
    console.log("error fetching restaurants by category",error);
  }
}


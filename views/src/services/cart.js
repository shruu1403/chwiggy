import { TESTING_URL } from "./api";

export const addToCart = async (foodItemID, quantity, token) => {
  try {
    const res = await fetch(`${TESTING_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ foodItemID, quantity }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log("error adding to cart:", error);
  }
};
export const getCart = async (token) => {
  try {
    const res = await fetch(`${TESTING_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log("error fetching cart details", error);
  }
};
export const updateCart = async (id, quantity, token) => {
  const res = await fetch(`${TESTING_URL}/cart/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity })
  });
  if (!res.ok) throw new Error("Failed to update cart");
  return res.json();
};
export const deleteCart=async(id,token)=>{
  try {
    const res=await fetch(`${TESTING_URL}/cart/delete/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`,
      },
    },
  )
  if(res.ok){
    return await res.json()
  }
  } catch (error) {
    console.log("error deleting item from the cart",error);
    
  }

}
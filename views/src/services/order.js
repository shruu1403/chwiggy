import { TESTING_URL } from "./api";

export const placeOrder = async (couponCode, token) => {
  const res = await fetch(`${TESTING_URL}/orders/place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ couponCode }),
  });

  if (!res.ok) throw new Error("Failed to place order");
  return await res.json();
};

export const getOrderHistory = async (token) => {
  const res = await fetch(`${TESTING_URL}/orders/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch order history");
  return await res.json();
};

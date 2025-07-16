import { useContext, useEffect, useState } from "react";
import styles from "../styles/Cart.module.css";
import { getCart, updateCart, deleteCart } from "../services/cart";
import { getCouponsByRestaurant } from "../services/dashboard";
import { placeOrder } from "../services/order";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const { auth } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantID, setRestaurantID] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCart(auth.token);
        setCartItems(data);
        if (Array.isArray(data) && data.length > 0) {
          const restaurantID = data[0].foodItemID.restaurantID;
          setRestaurantID(restaurantID);
          const couponData = await getCouponsByRestaurant(restaurantID);
          setCoupons(couponData);
        }
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [auth.token]);

  const changeQuantity = async (id, delta) => {
    const item = cartItems.find((c) => c._id === id);
    const newQty = Math.max(1, item.quantity + delta);

    try {
      await updateCart(id, newQty, auth.token);
      setCartItems((prev) =>
        prev.map((c) => (c._id === id ? { ...c, quantity: newQty } : c))
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon);
  };

const handleDelete = async (id) => {
  try {
    await deleteCart(id, auth.token);
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.success("Item removed from cart");
  } catch (error) {
    toast.error("Failed to remove the item");
    console.log("Error:", error);
  }
};

  const total = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => {
    const price = item?.foodItemID?.price || 0;
    const qty = item?.quantity || 0;
    return sum + price * qty;
  }, 0)
  :0;

  const discountAmount = selectedCoupon
    ? Math.round((selectedCoupon.discount / 100) * total)
    : 0;

  const finalAmount = total - discountAmount;

  const handlePlaceOrder = async () => {
  try {
    const response = await placeOrder(selectedCoupon?.code || null, auth.token);
    toast.success("Order Placed!");
    navigate("/order-history");
  } catch (err) {
    toast.error("Failed to place order");
    console.error(err);
  }
};

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className={styles.cartPage}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.itemsGrid}>
            {cartItems.map((item) => (
              <div key={item._id} className={styles.card}>
                <img
                  src={item.foodItemID.image}
                  alt={item.foodItemID.name}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <h3>{item.foodItemID.name}</h3>
                  <p>₹{item.foodItemID.price}</p>
                  <div className={styles.quantityBox}>
                    <button onClick={() => changeQuantity(item._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item._id, 1)}>+</button>
                  </div>
                  <p>Total: ₹{item.quantity * item.foodItemID.price}</p>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item._id)}>
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.couponSection}>
            <h3>Available Coupons</h3>
            {coupons.length === 0 ? (
              <p>No coupons available for this restaurant</p>
            ) : (
              <div className={styles.couponList}>
                {coupons.map((c) => (
                  <button
                    key={c._id}
                    className={`${styles.couponBtn} ${
                      selectedCoupon?.code === c.code ? styles.selected : ""
                    }`}
                    onClick={() => handleCouponSelect(c)}
                  >
                    {c.code} - {c.discount}% OFF
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.summary}>
            <h3>Subtotal: ₹{total}</h3>
            <p>Discount: ₹{discountAmount}</p>
            {selectedCoupon && <h2>After Coupon: ₹{finalAmount}</h2>}
            <button onClick={handlePlaceOrder} className={styles.checkoutBtn}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

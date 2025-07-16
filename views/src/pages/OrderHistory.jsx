import { useEffect, useState, useContext } from "react";
import { getOrderHistory } from "../services/order";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/OrderHistory.module.css";

export default function OrderHistory() {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrderHistory(auth.token);
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    }
    fetchOrders();
  }, [auth.token]);

  return (
    <div className={styles.historyPage}>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No previous orders.</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order._id} className={styles.orderCard}>
              <p>
                <strong>Total:</strong> ₹{order.finalAmount}
              </p>
              <ul>
                {order.items.map((item,index) => (
                 <li key={`${item.foodItemID?._id || index}`}>

                    {item.foodItemID
                      ? `${item.foodItemID.name} × ${item.quantity}`
                      : "Item not found"}{" "}
                    
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

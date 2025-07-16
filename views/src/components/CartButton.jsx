// src/components/CartButton.jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../services/cart";
import styles from "../styles/CartButton.module.css";
import { AuthContext } from "../context/AuthContext";

export default function CartButton() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const {auth}=useContext(AuthContext)

  useEffect(() => {
    async function fetchCart() {
      if(!auth.token) return
      try {
        const data = await getCart(auth.token);
        setCartCount(data.length || 0);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    }

    fetchCart();
  }, [auth.token]);

  return (
    <button className={styles.cartButton} onClick={() => navigate("/cart")}>
      View Cart {cartCount > 0 ? `(${cartCount})` : ""}
    </button>
  );
}

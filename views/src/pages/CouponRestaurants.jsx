// pages/CouponRestaurants.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantsByCoupon } from "../services/dashboard";
import styles from "../styles/CouponRestaurants.module.css";

export default function CouponRestaurants() {
  const { code } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const data = await getRestaurantsByCoupon(code);
        setRestaurants(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRestaurants();
  }, [code]);

  if (loading) return <p>Loading restaurants...</p>;

  return (
    <div className={styles.container}>
      <h2>Restaurants accepting coupon: "{code}" 🧀</h2>
      {restaurants.length === 0 ? (
        <p className={styles.noRestaurants}>
          No restaurants available for this coupon.
        </p>
      ) : (
        <div className={styles.grid}>
          {restaurants.map((r) => (
            <div
              key={r._id}
              className={styles.card}
            >
              <img src={r.image} alt={r.name} className={styles.image} />
              <h3>{r.name}</h3>
              <p>{r.address}</p>
              <button className={styles.button} onClick={() => navigate(`/restaurant/${r._id}/menu`)}>View Menu</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

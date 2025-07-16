import styles from "../styles/CategoryRestaurants.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantsByCategory } from "../services/dashboard";

export default function CategoryRestaurants() {
  const { category } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const data = await getRestaurantsByCategory(category);
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to fetch restaurants", err);
      }
    }

    fetchRestaurants();
  }, [category]);
  return (
    <div className={styles.container}>
      <h2 style={{ color: "orange" }}>
        Restaurants serving:{" "}
        <span style={{ color: "black" }}>"{category}" 🧀</span>
      </h2>
      <div className={styles.grid}>
        {restaurants.map((r) => (
          <div key={r._id} className={styles.card}>
            <img src={r.image} alt={r.name} className={styles.image} />

            <h3>{r.name}</h3>
            <p>{r.address}</p>
            <button
              className={styles.menuBtn}
              onClick={() =>
                navigate(
                  `/restaurant/${r._id}/food-details?category=${category}`
                )
              }
            >
              View Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

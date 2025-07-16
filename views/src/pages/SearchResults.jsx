import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchAll } from "../services/search";
import RestaurantCard from "../components/RestaurantCard";
import FoodCard from "../components/FoodCard";
import styles from "../styles/SearchResults.module.css";

export default function SearchResults({name}) {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [foods, setFoods] = useState([]);
  const [rests, setRests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResults() {
      try {
        const { foodItems, restaurants } = await searchAll(q);
        setFoods(foodItems);
        setRests(restaurants);
      } catch (err) {
        console.error("Search failed", err);
      }
    }

    if (q) fetchResults();
  }, [q]);
 

  return (
    <div className={styles.container}>
      <h2>Search results for "{q}"</h2>
      <div className={styles.section}>
        <h3>Food Items</h3>
        <div className={styles.grid}>
          {foods.map((f) => (
            <div key={f._id} style={{ pointerEvents: "none", opacity: 1.0 }}>
            <FoodCard
              key={f._id}
              name={f.name}
              image={f.image}
              
            />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3>Restaurants serving :"{q}"</h3>
        <div className={styles.grid}>
          {rests
            ?.filter((r) => r && r.image)
            .map((r) => (
              <RestaurantCard
                key={r._id}
                restaurant={r}
                onClick={() => navigate(`/restaurant/${r._id}/menu`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

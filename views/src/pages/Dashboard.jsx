import { useEffect, useState, useContext } from "react";
import styles from "../styles/dashboard.module.css";
import {
  getCoupons,
  getTopFoodItems,
  getTopRestaurants,
} from "../services/dashboard";
import { AuthContext } from "../context/AuthContext";
import CouponCard from "../components/CouponCard";
import FoodCard from "../components/FoodCard";
import CartButton from "../components/CartButton";
import RestaurantCard from "../components/RestaurantCard";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  const [coupons, setCoupons] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [city,setCity]=useState("Detecting...")

  useEffect(() => {
    async function fetchData() {
      try {
        //    // Ask for GPS coordinates
        // navigator.geolocation.getCurrentPosition(async (position) => {
        //   const { latitude, longitude } = position.coords;

        //   // Reverse geocode using OpenStreetMap (free)
        //   const res = await fetch(
        //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        //   );
        //   const data = await res.json();

        //   const city = data?.address?.city || data?.address?.town || data?.address?.village || "Unknown";
        //   const state = data?.address?.state || "";
        //   setCity(`${city}, ${state}`);
        // });

        const couponsData = await getCoupons();
        const foodData = await getTopFoodItems();
        const restaurantsData = await getTopRestaurants();
        setCoupons(couponsData);
        setFoodItems(foodData);
        setTopRestaurants(restaurantsData);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setError("Something went wrong while loading dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className={styles.dashboard}>
      <h2 className={styles.welcome}>🧀 WELCOME TO CHWIGGY 🧀</h2>
      <h2 className={styles.hi}>Hi {auth.user?.name}👋</h2>

      {/* <p style={{color:"brown", fontSize:"16px"}}><strong>{city}</strong></p> */}

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.section}>
        <h3>Available Coupons</h3>
        <div className={styles.cardGrid}>
          {coupons.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
      </div>

      <div className={styles.section_food}>
        <h3 style={{ color: "chocolate", fontSize: "20px" }}>
          What's on your mind?🧀
        </h3>
        <div className={styles.cardGrid_food}>
          {foodItems.map((item) => (
            <FoodCard key={item._id} {...item} />
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3 style={{ color: "chocolate", fontSize: "20px" }}>
          Some Top Restaurants to Explore...
        </h3>
        <div className={styles.cardGrid_dashboard}>
          {topRestaurants.map((r) => (
            <RestaurantCard key={r._id} restaurant={r} />
          ))}
        </div>
      </div>

      <CartButton />
    </div>
  );
}

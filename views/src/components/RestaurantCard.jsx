import { useNavigate } from "react-router-dom";
import styles from "../styles/RestaurantCard.module.css";

export default function RestaurantCard({ restaurant })
 {
   const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/restaurant/${restaurant._id}/menu`);
  };

  return (
    <div className={styles.card}>
        <img src={restaurant.image} alt={restaurant.name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <p className={styles.address}>
          {restaurant.address}, {restaurant.city}
        </p>
        <p className={styles.categories}>
          {restaurant.categories?.join(", ")}
        </p>
        <div className={styles.meta}>
          <span className={styles.rating}>⭐ {restaurant.rating}</span>
          <span className={styles.time}>⏱ {restaurant.deliveryTime}</span>
        <div className="buttonWrapper">  
      <button className={styles.viewBtn} onClick={handleClick}>
        View Menu →
      </button></div> 
      </div>
        </div>
      </div>
  );
}

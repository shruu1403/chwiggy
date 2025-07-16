// src/components/FoodCard.jsx
import { useNavigate } from "react-router-dom";
import styles from "../styles/FoodCard.module.css";

export default function FoodCard({ name, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${name}/restaurants`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
    </div>
  );
}

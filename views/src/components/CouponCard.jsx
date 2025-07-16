// src/components/CouponCard.jsx
import { useNavigate } from "react-router-dom";
import styles from "../styles/CouponCard.module.css";

export default function CouponCard({ coupon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/coupons/${coupon.code}/restaurants`);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{coupon.code}</h3>
      <p className={styles.discount}>{coupon.discount}%</p>
      <button className={styles.button} onClick={handleClick}>Grab Now</button>
    </div>
  );
}

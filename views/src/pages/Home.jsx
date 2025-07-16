import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Welcome to Chwiggy 🧀</h1>
        <p className={styles.subtitle}>
          Your go-to place for all things cheesy!
        </p>
        <div className={styles.buttonGroup}>
          <Link to="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
          <Link to="/register">
            <button className={styles.registerButton}>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

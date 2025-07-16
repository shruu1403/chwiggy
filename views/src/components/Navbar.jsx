import { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProfileIcon from "../components/ProfileIcon";
import styles from "../styles/Navbar.module.css";
const Navbar = () => {
  const location = useLocation();

  if (["/", "/login", "/register"].includes(location.pathname)) return null;
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/dashboard" className={`${styles.link} ${location.pathname ==="/dashboard" ? styles.active:""}`}>
          Dashboard
        </Link>
        <Link to="/cart" className={`${styles.link} ${location.pathname ==="/cart" ? styles.active:""}`}>
          Cart
        </Link>
        <div className={styles.header}>
          <SearchBar />
          <ProfileIcon />
        </div>
      </div>
    </div>
  );
};
export default Navbar;

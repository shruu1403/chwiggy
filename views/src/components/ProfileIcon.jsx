import { useContext, useEffect, useState,useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/ProfileIcon.module.css";
import { useNavigate } from "react-router-dom";

export default function ProfileIcon() {
  const { auth, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const wrapperRef = useRef(null);
  const Navigate=useNavigate()

  const handleLogout = () => {
    logout();
    setShowModal(false);
    setShowDropdown(false);
    Navigate("/login")
  };

  const initial = auth.user?.name.charAt(0).toUpperCase() || "?";

  useEffect(()=>{
    const handleClickOutside=(e)=>{
      if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown",handleClickOutside)
    return()=>document.removeEventListener("mousedown",handleClickOutside)
  },[])

  return (
   <div className={styles.profileWrapper} ref={wrapperRef}>
      {/* Profile Icon */}
      <div
        className={styles.icon}
        onClick={() => setShowDropdown(!showDropdown)}
        title="Profile"
      >
        {initial}
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className={styles.dropdown}>
          <button onClick={() => setShowModal(true)}>Logout</button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to logout?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/RestaurantMenu.module.css";
import { getMenuByRestaurant, getCouponsByRestaurant } from "../services/dashboard";
import { addToCart } from "../services/cart";
import { AuthContext } from "../context/AuthContext";
import CartButton from "../components/CartButton";

export default function RestaurantMenu() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [isVeg, setIsVeg] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder]=useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getMenuByRestaurant(id, { isVeg, sortBy,order });
      setRestaurant(data.restaurant);
      setItems(data.items);
      setQuantities(
        data.items.reduce((acc, item) => {
          acc[item._id] = 1;
          return acc;
        }, {})
      );
    } catch (err) {
      console.error("Failed to load menu", err);
    }

    try {
      const couponsData = await getCouponsByRestaurant(id);
      setCoupons(couponsData);
    } catch (err) {
      console.error("Failed to load coupons", err);
    }
  }
   fetchData();
  }, [id, isVeg, sortBy,order]);

  const changeQuantity = (itemID, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [itemID]: Math.max(1, (prev[itemID] || 1) + delta),
    }));
  };

  const handleAddToCart = async (itemID) => {
    try {
      await addToCart(itemID, quantities[itemID], auth.token);
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const resetFilters = () => {
    setIsVeg("");
    setSortBy("");
  };

  return (
    <div className={styles.menuPage}>
      {restaurant ? (
        <>
          <h2 className={styles.heading}>{restaurant.name} - Menu</h2>
          <p className={styles.subheading}>
            {restaurant.city}, {restaurant.address}
          </p>

          {/* Coupons */}
          <div className={styles.parentBox}>
          {coupons.length > 0 && (
            <div className={styles.couponBox}>
              <h3 className={styles.couponHeading} style={{ color: "orange" }}>Available Coupons 🎁</h3>
              <ul>
                {coupons.map((c) => (
                  <li key={c._id}>
                    <strong>{c.code}</strong> - {c.discount}% OFF
                  </li>
                ))}
              </ul>
            </div>
          )}
           {/* Filters */}
          <div className={styles.filters}>
            <label>
              Filter:
              <select value={isVeg} onChange={(e) => setIsVeg(e.target.value)}>
                <option value="">All</option>
                <option value="true">Veg</option>
                <option value="false">Non-Veg</option>
              </select>
            </label>

            <label>
              Sort by Price:
              <select value={sortBy} onChange={(e) =>{
                const value=e.target.value
                if(value==="asc" || value==="desc"){
                  setSortBy("price")
                  setOrder(value)
                }else{
                  setSortBy("")
                  setOrder("")
                }
              } }>
                <option value="">-- Select --</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </label>

            <button className={styles.resetBtn} onClick={resetFilters}>Reset Filters</button>
          </div>
          </div>
         

          {/* Food items */}
          <div className={styles.menuGrid}>
            {items.map((item) => (
              <div className={styles.card} key={item._id}>
                <img src={item.image} alt={item.name} className={styles.image} />
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.category}>{item.category}</p>
                <p className={styles.price}>₹{item.price}</p>
                <p className={styles.veg}>
                  {item.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
                </p>

                <div className={styles.cartActions}>
                  <button onClick={() => changeQuantity(item._id, -1)} className={styles.incbtn}>-</button>
                  <span>{quantities[item._id] || 1}</span>
                  <button onClick={() => changeQuantity(item._id, 1)} className={styles.incbtn}>+</button>
                  <button onClick={() => handleAddToCart(item._id)} className={styles.addBtn}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading restaurant info...</p>
      )}
      <CartButton />
    </div>
  );
}

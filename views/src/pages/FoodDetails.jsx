import { useEffect, useState } from "react";
import { useParams, useSearchParams,useNavigate } from "react-router-dom";
import { getFoodItemsByCategory } from "../services/fooditems"; // your file
import { addToCart } from "../services/cart";
import styles from "../styles/FoodDetails.module.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CartButton from "../components/CartButton";

export default function FoodDetails() {
  const { id } = useParams(); // restaurantID
  const [searchParams] = useSearchParams();  //category
  const category = searchParams.get("category"); // category from query string
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getFoodItemsByCategory(id, category);
        setItems(data.items);
        setQuantities(
            data.items.reduce((acc, item) => {
            acc[item._id] = 1;
            return acc;
          }, {})
        )
      } catch (err) {
        console.error("Failed to fetch menu items", err);
      }
    }
    fetchItems();
  }, [id, category]);

  const handleAddToCart = async (itemID) => {
    try {
      await addToCart(itemID, quantities[itemID], auth.token);
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };
 const changeQuantity = (itemID, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [itemID]: Math.max(1, (prev[itemID] || 1) + delta),
    }));
  };

  return (
    <div className={styles.menuPage}>
      <h2>{category ? `To fulfill your "${category}" craving` : "Menu"}</h2>
      <div className={styles.grid}>
        {items?.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className={styles.card}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className={styles.cartActions}>
                  <button
                    className={styles.incbtn}
                    onClick={() => changeQuantity(item._id, -1)}
                  >
                    -
                  </button>
                  <span>{quantities[item._id] || 1}</span>
                  <button
                    className={styles.incbtn}
                    onClick={() => changeQuantity(item._id, 1)}
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className={styles.addBtn}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          ))
        
        ):(<p>no items found</p>)}
      </div>
      <CartButton />
    </div>
  );
}

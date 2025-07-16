import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchResults from "./pages/SearchResults";
import CouponRestaurants from "./pages/CouponRestaurants";
import RestaurantMenu from "./pages/RestaurantMenu";
import Cart from "./pages/Cart";
import CategoryRestaurants from "./pages/CategoryRestaurants";
import FoodDetails from "./pages/FoodDetails";
import OrderHistory from "./pages/OrderHistory";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <ToastContainer position="top-center" />

      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/coupons/:code/restaurants"
            element={<CouponRestaurants />}
          />
          <Route
            path="/category/:category/restaurants"
            element={<CategoryRestaurants />}
          />
          <Route
            path="/restaurant/:id/food-details"
            element={<FoodDetails />}
          />
          <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </Router>
    </>
  );
}

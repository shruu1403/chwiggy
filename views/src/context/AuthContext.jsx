import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { TESTING_URL } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    user: null,
  });

  useEffect(() => {
  if (auth.token) {
    try {
      const decoded = jwtDecode(auth.token);
      setAuth((prev) => ({
        ...prev,
        user: { name: decoded.user },
      }));
    } catch (err) {
      console.error("Invalid token:", err);
      setAuth({ token: null, user: null });
      localStorage.removeItem("token");
    }
  }
}, [auth.token]);


const login = (token) => {
  try {
    const decoded = jwtDecode(token);
    localStorage.setItem("token", token);
    setAuth({
      token,
      user: { name: decoded.user },
    });
  } catch (err) {
    console.error("Token decode failed:", err);
  }
};

 const logout = async () => {
  try {
    const token = auth.token
console.log("logout in process");
    if (token) {
      await fetch(`${TESTING_URL}/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (err) {
    console.error("Logout API failed:", err);
  } finally {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  }
};


  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_Backend_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.token);
      navigate("/dashboard");
    } else {
      alert(data.msg);
    }
  };
  const handleGoogleLogin = () => {
    window.open(
      `${process.env.REACT_APP_Backend_URL}/auth/google`,
      "_blank",
      "width=500,height=600"
    );

    window.addEventListener("message", (event) => {
      if (event.origin !== "https://chwiggy-backend.onrender.com")
        return;

      const { token } = event.data;
      if (token) {
        login(token); // ✅ save token via context
        navigate("/dashboard"); // ✅ go to dashboard
      }
    });
  };
 

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.title2}>
          "Where every login leads to a world of Cheese!"🧀
        </p>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p
          style={{
            fontSize: "15px",
            textAlign: "center",
            color: "gray",
            margin: "0",
          }}
        >
          {" "}
          ——— OR ———
        </p>
         <button
          type="button"
          className={styles.googlebutton}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

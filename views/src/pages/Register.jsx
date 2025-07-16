import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const {login}=useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_Backend_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    const data = await res.json();
    alert(data.msg);
    if (res.ok) navigate("/login");
  };

  const handleGoogleLogin = () => {
    window.open(
      "http://localhost:8080/api/auth/google",
      "_blank",
      "width=500,height=600"
    );

    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:8080") return;

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
        <h2 className={styles.title}>Register</h2>
        <p className={styles.title2}>
          "Where every Register leads to a world of Cheese!"🧀
        </p>

        {["name", "email", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className={styles.input}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}
        <button type="submit" className={styles.button}>
          Register
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

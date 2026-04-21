import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const DEV_MODE = true;

  // DEV ACCESS (instant admin login)
  const handleDevAccess = () => {
    localStorage.setItem("auth", "true");
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "admin", email: "dev@admin.com" })
    );

    navigate("/home"); // 🔥 go straight to admin
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/react-auth/login.php",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/home");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Login error");
    }
  };

  return (
    <div className="login-container">
      <h1>P.Parkers</h1>

      {/* 🔥 DEV BUTTON */}
      {DEV_MODE && (
        <button onClick={handleDevAccess} style={{ marginBottom: "10px" }}>
          Dev Admin Access
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
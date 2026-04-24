import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";


function AdminLoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const DEV_MODE = true; // toggle here

  //  DEV BYPASS (safe version)
  const handleDevAccess = () => {
    localStorage.setItem("auth", "true");
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "admin", email: "dev@admin.com" })
    );

    onClose();
    navigate("/admin"); //  go to dashboard page
  };

  if (!isOpen) return null;

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/react-auth/login.php",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

            if (response.data.success) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(response.data.user));

        onClose();
        navigate("/dashboard"); //  go to dashboard page
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error or no response");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="modal-overlay">
    <div className="modal-box">
      <h2>Admin Login</h2>

      {/*  DEV BUTTON (temporary backdoor) */}
      {DEV_MODE && (
        <button onClick={handleDevAccess} style={{ marginBottom: "10px" }}>
          Dev Enter Admin
        </button>
      )}

      <input className="in"
        placeholder="admin "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input  className="in"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
     
     
       <div className="devgrp">
      <button className="log" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <button className="close" onClick={onClose}>Close</button>
    </div>
    </div>
  </div>
);
}

export default AdminLoginModal;
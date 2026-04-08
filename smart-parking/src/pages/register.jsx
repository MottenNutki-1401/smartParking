import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/react-auth/register.php",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert(response.data.message || "Registration successful!");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      if (error.response) {
        alert("Error: " + (error.response.data.message || error.response.statusText));
      } else if (error.request) {
        alert("No response from server");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="Register-container">
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

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

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
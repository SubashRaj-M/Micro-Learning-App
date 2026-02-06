import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Attempting login..."); // Debug 1

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      console.log("Server Response:", response.data); // Debug 2: See what the backend sent!

      const role = response.data.role;
      
      // Save data
      localStorage.setItem("token", "Basic " + btoa(username + ":" + password));
      localStorage.setItem("user", response.data.username);
      localStorage.setItem("role", role);

      console.log("Role found:", role); // Debug 3

      // STRICT Navigation Check
      if (role === "ADMIN") {
        console.log("Redirecting to Admin Dashboard...");
        navigate("/admin-dashboard");
      } else if (role === "USER") {
        console.log("Redirecting to User Dashboard...");
        navigate("/user-dashboard");
      } else {
        // Fallback if role is null or lowercase
        console.log("Role unknown, defaulting to User Dashboard...");
        navigate("/user-dashboard");
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError("Login Failed. Check console for details.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <p style={{marginTop: '15px', fontSize: '14px'}}>
             Don't have an account? <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate("/register")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
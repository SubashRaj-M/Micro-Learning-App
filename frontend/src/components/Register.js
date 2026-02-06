// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Login.css"; // Reuse the Login styling

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    //   await axios.post("http://localhost:8080/api/auth/register", {
    //     username,
    //     password,
    //     role: "USER" // Default role
    //   });
    await api.post("/auth/register", { username,
     password,
     role: "USER" 
    });


      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      setError("Username likely already taken.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>
        <p>Join the Micro-Learning App</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn" style={{backgroundColor: '#28a745'}}>Sign Up</button>
        </form>
        
        <p style={{marginTop: '15px', fontSize: '14px'}}>
            Already have an account? <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";// Using your existing pure CSS file for theme styling

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
     const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

fetch(`${API_URL}/api/accounts/login/`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setErrorMessage(data.error || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login submission error:", error);
      setErrorMessage("Server error connecting to backend.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="auth-form">
          {errorMessage && (
            <p
              style={{
                color: "#ff4d4f",
                fontSize: "14px",
                margin: "0 0 12px 0",
                textAlign: "left",
                fontWeight: "500",
                width: "100%",
              }}
            >
              {errorMessage}
            </p>
          )}

          <input 
            type="text" 
            placeholder="Username" 
            className="auth-input"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              setErrorMessage("");
            }}
            required 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="auth-input"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrorMessage("");
            }}
            required 
          />

          {/* 🎯 Row Layer with high-contrast text styling */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "4px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "rgba(255, 255, 255, 0.9)", fontSize: "14px" }}>
              <input type="checkbox" style={{ cursor: "pointer", accentColor: "#ffffff" }} />
              Remember me
            </label>
            
            <span 
              onClick={() => navigate("/forgot-password")} 
              style={{ cursor: "pointer", color: "rgba(255, 255, 255, 0.9)", fontSize: "14px" }}
              onMouseOver={(e) => e.target.style.textDecoration = "underline"}
              onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
              Forgot password?
            </span>
          </div>

          <button type="submit" className="auth-button">Login</button>

          {/* 🎯 Bottom Footer Layout Panel with matching high-contrast values */}
          <p style={{ margin: "16px 0 0 0", textAlign: "center", color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}>
            Don't have an account?{" "}
            <span 
              onClick={() => navigate("/signup")} 
              style={{ cursor: "pointer", fontWeight: "600", color: "#00d2ff" }}
              onMouseOver={(e) => e.target.style.textDecoration = "underline"}
              onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
              Register
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
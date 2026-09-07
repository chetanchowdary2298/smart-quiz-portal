import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 👈 FIXED URL: Removed the duplicate "/accounts" segment
    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

fetch(`${API_URL}/api/accounts/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Account created! Please login.");
        navigate("/login");
      } else {
        alert("Error creating account.");
      }
    } catch (error) {
      alert("Server error.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSignup} className="auth-form">
          <input 
            type="text" 
            placeholder="Username" 
            className="auth-input"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="auth-input"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="auth-input"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
          <button type="submit" className="auth-button">Signup</button>
        </form>
        <p className="auth-link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
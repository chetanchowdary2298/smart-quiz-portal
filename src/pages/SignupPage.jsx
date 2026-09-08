import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

      const response = await fetch(`${API_URL}/api/accounts/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Error creating account.");
      }
    } catch (error) {
      console.error("Signup error:", error);
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
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            required
          />

          <button type="submit" className="auth-button">
            Signup
          </button>
        </form>

        <p className="auth-link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
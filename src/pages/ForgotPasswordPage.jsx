import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpages.css"; 

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleResetRequest = async (e) => {
        e.preventDefault();
       try {
    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const response = await fetch(`${API_URL}/api/accounts/password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
            if (response.ok) {
                alert("If this email exists, a reset link has been sent to your Gmail.");
                navigate("/login");
            } else {
                alert("Error sending reset link.");
            }
        } catch (error) {
            alert("Connection error. Is Django running?");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Reset Password</h2>
                <form onSubmit={handleResetRequest} className="auth-form">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <button type="submit" className="auth-button">Send Reset Link</button>
                </form>
                <p className="auth-link" onClick={() => navigate('/login')}>
                    Back to Login
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
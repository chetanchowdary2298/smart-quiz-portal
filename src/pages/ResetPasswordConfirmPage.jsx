import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // 🎯 Switched useParams to useLocation
import "./LoginPages.css";

const ResetPasswordConfirmPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 🎯 NEW: Safely extracts the uid and token from the URL query parameters (?uid=xxx&token=yyy)
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get("uid");
    const token = queryParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!uid || !token) {
            alert("Reset tokens are missing or malformed!");
            return;
        }

        setLoading(true);

        try {
    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const response = await fetch(
        `${API_URL}/api/accounts/password-reset-confirm/${uid}/${token}/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password }),
        }
    );
            if (response.ok) {
                alert("Password updated successfully! Redirecting to home...");
                navigate("/"); 
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Reset link expired or invalid.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Server connection failed. Is Django running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">New Password</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        className="auth-input" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="auth-input" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordConfirmPage;
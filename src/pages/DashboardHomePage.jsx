import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 1. Import your image file directly
import dashboardBg from "../assets/dashboard-bg.jpg"; 
import "./DashboardHomePage.css";

const DashboardHomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUsername(userData.username || "yashuu");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    // 2. Apply the image as a background style here
    <div 
      className="dashboard-home-wrapper" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${dashboardBg})` 
      }}
    >
      <div className="dashboard-home-content">
        <h1 className="welcome-title">Hey, {username}! </h1>
        <p className="motivation-text">"Your only limit is your mind. Let's push it today!"</p>
        
        <p className="status-text">Ready to sharpen your skills?</p>
        
        <button 
          className="take-quiz-main-btn" 
          onClick={() => navigate("/dashboard/test")}
        >
          Take Quiz
        </button>
      </div>
    </div>
  );
};

export default DashboardHomePage;
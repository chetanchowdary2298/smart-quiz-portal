import React from "react";
import { useNavigate } from "react-router-dom";
import "./TestPage.css";

const TestPage = () => {
  const navigate = useNavigate();

  // Added C++ to your existing language list
  const languages = [
    { name: "Python", id: "python" },
    { name: "Java", id: "java" },
    { name: "C++", id: "cpp" }, // New C++ Card
    { name: "C Programming", id: "c" },
    { name: "DBMS", id: "dbms" },
    { name: "AI", id: "ai" }
  ];

  return (
    <div className="test-page-wrapper">
      <h1 className="test-main-title">Choose Your Language</h1>
      <div className="language-grid">
        {languages.map((lang) => (
          <div key={lang.id} className="lang-card">
            <h2 className="lang-name">{lang.name}</h2>
            <button 
              className="start-quiz-btn" 
              onClick={() => navigate(`/dashboard/test/${lang.id}`)}
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
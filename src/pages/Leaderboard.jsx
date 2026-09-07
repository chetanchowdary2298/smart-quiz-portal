import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaMedal, FaArrowLeft } from "react-icons/fa";
import "./Leaderboard.css";

const Leaderboard = () => {
  const navigate = useNavigate();

  // Mock data - In a real app, fetch this from your Django backend
  const topScorers = [
    { rank: 1, name: "yashuu", score: 980, language: "Python" },
    { rank: 2, name: "Arjun", score: 945, language: "Java" },
    { rank: 3, name: "Sneha", score: 910, language: "C++" },
    { rank: 4, name: "Rahul", score: 850, language: "Python" },
    { rank: 5, name: "Priya", score: 820, language: "DBMS" },
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="rank-icon gold" />;
    if (rank === 2) return <FaMedal className="rank-icon silver" />;
    if (rank === 3) return <FaMedal className="rank-icon bronze" />;
    return <span className="rank-number">{rank}</span>;
  };

  return (
    <div className="leaderboard-wrapper">
      <div className="leaderboard-glass-card animated-in">
        <div className="leaderboard-header">
          <FaArrowLeft className="back-icon" onClick={() => navigate("/dashboard/home")} />
          <h1 className="selection-title">Global Leaderboard</h1>
        </div>

        <div className="leaderboard-list">
          <div className="list-header">
            <span>Rank</span>
            <span>User</span>
            <span>Language</span>
            <span>Score</span>
          </div>

          {topScorers.map((user) => (
            <div key={user.rank} className={`user-row ${user.name === "yashuu" ? "current-user" : ""}`}>
              <div className="rank-cell">{getRankIcon(user.rank)}</div>
              <div className="name-cell">{user.name}</div>
              <div className="lang-cell">
                <span className="tag-lang-mini">{user.language}</span>
              </div>
              <div className="score-cell">{user.score}</div>
            </div>
          ))}
        </div>

        <button className="finish-btn-styled" onClick={() => navigate("/dashboard/test")}>
          Take New Test
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
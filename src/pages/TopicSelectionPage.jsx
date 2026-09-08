import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./TopicSelection.css";

// Topic configuration mapper
const subjectTopics = {
  "Python": ["Basics", "Loops", "Functions", "Arrays", "Data Structures"],
  "Java": ["Basics", "Loops", "Functions", "Arrays", "Data Structures"],
  "C++": ["Basics", "Loops", "Functions", "Arrays", "Data Structures"],
  "C Programming": ["Basics", "Loops", "Functions", "Arrays", "Data Structures"],
  "Dbms": [
    "SQL Basics",
    "Normalization",
    "Indexing & Joins",
    "Transactions (ACID)",
    "NoSQL Databases"
  ],
  "Ai": [
    "Search Algorithms",
    "Machine Learning",
    "Neural Networks",
    "NLP Basics",
    "Computer Vision"
  ]
};

const TopicSelectionPage = () => {
  const { langId } = useParams();
  const navigate = useNavigate();

  // Format langId to capitalize just the first letter
  const capitalizedLang = langId
    ? langId.charAt(0).toUpperCase() + langId.slice(1).toLowerCase()
    : "Python";

  // Dynamically get the topics list for the current language
  const availableTopics =
    subjectTopics[capitalizedLang] || subjectTopics["Python"];

  // Initialize state
  const [topic, setTopic] = useState(availableTopics[0]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");

  // Reset topic whenever language changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setTopic(availableTopics[0]);
  }, [langId]);

  const handleStartTest = () => {
    // Format language for the backend
    let formattedLang = capitalizedLang;

    if (capitalizedLang === "Dbms") formattedLang = "DBMS";
    if (capitalizedLang === "Ai") formattedLang = "AI";

    // Format difficulty
    let formattedDiff =
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    // Handle Random difficulty
    if (difficulty === "random") {
      const levels = ["Easy", "Medium", "Hard"];
      formattedDiff =
        levels[Math.floor(Math.random() * levels.length)];
    }

    navigate("/dashboard/quiz-start", {
      state: {
        language: formattedLang,
        topic: topic,
        difficulty: formattedDiff,
        numQuestions: parseInt(numQuestions)
      }
    });
  };

  return (
    <div className="topic-selection-wrapper">
      <div className="selection-container-card">

        <div className="header-row">
          <FaArrowLeft
            className="back-icon"
            onClick={() => navigate("/dashboard/test")}
          />

          <h1 className="selection-title">
            {langId?.toUpperCase()} Assessment
          </h1>
        </div>

        <div className="selection-section">
          <label className="section-label">Choose Topic</label>

          <select
            className="selection-dropdown"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {availableTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-section">
          <label className="section-label">Difficulty Level</label>

          <div className="difficulty-grid">
            {["Easy", "Medium", "Hard", "Random"].map((level) => (
              <div
                key={level}
                className={`difficulty-box ${
                  difficulty === level.toLowerCase() ? "active" : ""
                }`}
                onClick={() =>
                  setDifficulty(level.toLowerCase())
                }
              >
                {level}
              </div>
            ))}
          </div>
        </div>

        <div className="selection-section">
          <label className="section-label">
            Number of Questions
          </label>

          <input
            type="number"
            className="question-input"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            min="1"
            max="30"
          />
        </div>

        <button
          className="take-test-final-btn"
          onClick={handleStartTest}
        >
          Take Test
        </button>

      </div>
    </div>
  );
};

export default TopicSelectionPage;
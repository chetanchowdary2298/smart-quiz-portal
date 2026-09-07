import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./QuizPage.css";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use a fallback empty object to prevent "undefined" errors
  const { language, topic, difficulty, numQuestions, reviewData } =
    location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);

  // Backend API URL
  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    // 1. Handle Review Mode first
    if (reviewData) {
      setQuestions(reviewData.questions || []);
      setAnswers(reviewData.userAnswers || []);
      setScore(reviewData.score || 0);
      setReviewMode(true);
      setLoading(false);
      return;
    }

    // 2. Validate Navigation State
    if (!language || !topic) {
      console.error("Missing language or topic configuration inputs!");
      navigate("/dashboard/test");
      return;
    }

    // 3. Connect API Call to your Django Backend
    const fetchQuizQuestions = async () => {
      try {
        setLoading(true);

        // Build dynamic query params tracking selected subject parameters
        const queryParams = new URLSearchParams({
          language: language,
          topic: topic,
          difficulty: difficulty || "Easy",
          limit: numQuestions || 10,
        });

        // Connect to Django API
        const response = await fetch(
          `${API_URL}/api/accounts/questions/?${queryParams.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            "Network response encountered operational anomalies."
          );
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          alert(
            `CRITICAL: No questions discovered inside MySQL database matching Language: "${language}" and Topic: "${topic}"`
          );
          navigate("/dashboard/test");
          return;
        }

        // Map backend relational models properties keys to match frontend properties
        const formattedQuestions = data.map((q) => {
          // Find the text value string marked true within options relationships
          const correctOption = q.options.find(
            (opt) =>
              opt.is_correct === true || opt.is_correct === "true"
          );

          return {
            id: q.id,
            question: q.text,
            options: q.options.map((o) => o.text),
            answer: correctOption ? correctOption.text : "",
          };
        });

        setQuestions(formattedQuestions);
        setTimer(formattedQuestions.length * 45);
        setAnswers(new Array(formattedQuestions.length).fill(null));
      } catch (error) {
        console.error("API Fetch Error encountered:", error);
        alert(
          "Failed to pull question pool records from the database server."
        );
        navigate("/dashboard/test");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [
    language,
    topic,
    difficulty,
    numQuestions,
    navigate,
    reviewData,
    API_URL,
  ]);

  // Timer Logic
  useEffect(() => {
    if (
      timer > 0 &&
      !showReport &&
      !reviewMode &&
      !loading
    ) {
      const interval = setInterval(
        () => setTimer((prev) => prev - 1),
        1000
      );

      return () => clearInterval(interval);
    } else if (
      timer === 0 &&
      questions.length > 0 &&
      !showReport &&
      !reviewMode &&
      !loading
    ) {
      handleSubmit();
    }
  }, [
    timer,
    showReport,
    questions.length,
    reviewMode,
    loading,
  ]);

  const handleAnswerChange = (opt) => {
    if (reviewMode) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = opt;
    setAnswers(newAnswers);
  };

  // Sends assessment scores to backend
  const handleSubmit = async () => {
    let sc = 0;

    questions.forEach((q, i) => {
      if (q.answer === answers[i]) sc++;
    });

    setScore(sc);
    setShowReport(true);

    const reportEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      language,
      topic,
      score: sc,
      total: questions.length,
      percentage: Math.round(
        (sc / questions.length) * 100
      ),
      questions,
      userAnswers: answers,
    };

    // Keep LocalStorage reporting operational
    const existingReports = JSON.parse(
      localStorage.getItem("quiz_reports") || "[]"
    );

    localStorage.setItem(
      "quiz_reports",
      JSON.stringify([
        reportEntry,
        ...existingReports,
      ])
    );

    // Sync metrics payload directly to Django
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/api/accounts/scores/save/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // SimpleJWT Bearer token
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: JSON.stringify({
          language: language,
          score: sc,
          total_questions: questions.length,
        }),
      });

      console.log(
        "Score metrics successfully synchronized to backend."
      );
    } catch (error) {
      console.error(
        "Failed to push score dataset logs to server endpoints:",
        error
      );
    }
  };

  // Define variables safely for the render
  const currentQ = questions[currentIndex];

  const attemptedCount = answers.filter(
    (ans) => ans !== null
  ).length;

  const progressPercent =
    questions.length > 0
      ? (attemptedCount / questions.length) * 100
      : 0;

  // --- LOADING / SAFETY GUARD PANEL ---
  if (
    loading ||
    !questions ||
    questions.length === 0 ||
    !currentQ
  ) {
    return (
      <div className="quiz-main-wrapper">
        <div className="quiz-loading">
          <h1 className="selection-title">
            Loading Assessment...
          </h1>

          <p className="motivation-text">
            Checking database endpoints for {language} -{" "}
            {topic}...
          </p>

          <div
            className="spinner"
            style={{
              margin: "20px auto",
              width: "40px",
              height: "40px",
              border: "4px solid #00d2ff",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation:
                "spin 1s linear infinite",
            }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-main-wrapper">
      {showReport && !reviewMode ? (
        <div className="quiz-glass-card result-card animated-in">
          <h1 className="selection-title">
            Assessment Results
          </h1>

          <div className="score-container">
            <div className="score-circle">
              <span className="score-number">
                {score}
              </span>

              <span className="score-divider">
                /
              </span>

              <span className="score-total">
                {questions.length}
              </span>
            </div>
          </div>

          <div className="result-feedback">
            <h3 className="feedback-status">
              {score / questions.length >= 0.8
                ? "Mastery Achieved! 🏆"
                : "Keep Learning! 🚀"}
            </h3>

            <p className="motivation-text">
              Excellent Work! You can now review your
              answers to check for mistakes.
            </p>
          </div>

          <div className="result-actions">
            <button
              className="nav-control prev review-btn"
              onClick={() => setReviewMode(true)}
            >
              Review Answers
            </button>

            <button
              className="finish-btn-styled"
              onClick={() =>
                navigate("/dashboard/reports")
              }
            >
              View Reports
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-glass-card">
          <div className="quiz-top-bar">
            <div className="meta-info">
              <span className="tag-lang">
                {reviewMode
                  ? "Reviewing"
                  : language}
              </span>

              {reviewMode && (
                <span className="review-badge">
                  Review Mode
                </span>
              )}
            </div>

            {!reviewMode && (
              <div
                className={`timer-box ${
                  timer < 20 ? "warning" : ""
                }`}
              >
                ⏱ {Math.floor(timer / 60)}:
                {(timer % 60)
                  .toString()
                  .padStart(2, "0")}
              </div>
            )}
          </div>

          <div className="quiz-progress-section">
            <div className="progress-labels">
              <span>
                Question {currentIndex + 1} of{" "}
                {questions.length}
              </span>

              <span>
                {Math.round(progressPercent)}% Attempted
              </span>
            </div>

            <div className="progress-track">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${progressPercent}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="question-content">
            <h3 className="question-heading">
              {currentQ.question}
            </h3>

            <div className="options-layout">
              {currentQ.options.map((opt, i) => {
                const isCorrect =
                  opt === currentQ.answer;

                const isSelected =
                  answers[currentIndex] === opt;

                let statusClass = "";

                if (reviewMode) {
                  if (isCorrect)
                    statusClass = "correct-opt";
                  else if (isSelected)
                    statusClass = "wrong-opt";
                } else if (isSelected) {
                  statusClass = "is-selected";
                }

                return (
                  <label
                    key={i}
                    className={`option-wrapper ${statusClass}`}
                  >
                    <input
                      type="radio"
                      name="quiz-answer"
                      checked={isSelected}
                      onChange={() =>
                        handleAnswerChange(opt)
                      }
                      disabled={reviewMode}
                    />

                    <div className="option-indicator">
                      {String.fromCharCode(65 + i)}
                    </div>

                    <span className="option-text">
                      {opt}
                    </span>

                    {reviewMode && isCorrect && (
                      <span className="status-icon">
                        ✔
                      </span>
                    )}

                    {reviewMode &&
                      isSelected &&
                      !isCorrect && (
                        <span className="status-icon">
                          ✖
                        </span>
                      )}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="quiz-navigation">
            <button
              className="nav-control prev"
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex(
                  (prev) => prev - 1
                )
              }
            >
              Previous
            </button>

            {currentIndex <
            questions.length - 1 ? (
              <button
                className="nav-control next"
                onClick={() =>
                  setCurrentIndex(
                    (prev) => prev + 1
                  )
                }
              >
                Next
              </button>
            ) : (
              <button
                className="nav-control submit"
                onClick={
                  reviewMode
                    ? () =>
                        navigate(
                          "/dashboard/reports"
                        )
                    : handleSubmit
                }
              >
                {reviewMode
                  ? "Back to Reports"
                  : "Submit Test"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
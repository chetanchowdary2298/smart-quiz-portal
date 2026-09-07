import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportsPage.css";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all saved results from localStorage
    const savedReports = JSON.parse(localStorage.getItem("quiz_reports") || "[]");
    setReports(savedReports);
  }, []);

  const handleReview = (report) => {
    // Navigate back to QuizPage but pass the saved question data
    navigate("/dashboard/quiz-start", { state: { reviewData: report } });
  };

  return (
    <div className="reports-wrapper">
      <div className="reports-glass-card animated-in">
        <div className="reports-header">
          <h1 className="selection-title">Your Performance Reports</h1>
          <p className="motivation-text">Review your past attempts and track your progress.</p>
        </div>

        {reports.length === 0 ? (
          <div className="no-reports">
            <p className="motivation-text">No reports found yet. Complete a test to see your results here!</p>
            <button className="finish-btn-styled" onClick={() => navigate("/dashboard/test")}>
              Take Your First Test
            </button>
          </div>
        ) : (
          <div className="reports-table-container">
            <div className="reports-table-header">
              <span>Date</span>
              <span>Language</span>
              <span>Topic</span>
              <span>Score</span>
              <span>Action</span>
            </div>
            
            <div className="reports-list">
              {reports.map((report) => (
                <div key={report.id} className="report-row">
                  <span className="date-cell">{report.date}</span>
                  <span><span className="tag-lang-mini">{report.language}</span></span>
                  <span className="topic-text">{report.topic}</span>
                  <span className="score-text">{report.score} / {report.total}</span>
                  <button className="review-action-btn" onClick={() => handleReview(report)}>
                    Review Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
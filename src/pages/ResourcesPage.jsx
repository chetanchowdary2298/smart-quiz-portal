import React from "react";
import "./ResourcesPage.css";

const ResourcesPage = () => {
  const resourceData = [
    {
      id: 1,
      title: "Python Mastery",
      ytId: "rfscVS0vtbw", // Example ID: Programming with Mosh
      pdfUrl: "https://cdn.codewithmosh.com/image/upload/v1702942822/cheat-sheets/python.pdf",
      description: "Comprehensive guide to Python syntax, data types, and core libraries."
    },
    {
      id: 2,
      title: "Java Fundamentals",
      ytId: "eIrMblyqi8E", // Example ID: ProgrammingKnowledge
      pdfUrl: "https://introprogramming.info/wp-content/uploads/2013/07/Books/Java/Introduction-to-Programming-with-Java-Book-v2015.pdf",
      description: "Master Object-Oriented Programming and Java development basics."
    },
    {
      id: 3,
      title: "DBMS & SQL",
      ytId: "HXV3zeQKqGY", // Example ID: freeCodeCamp
      pdfUrl: "https://zerotomastery.io/cheatsheets/sql-cheat-sheet-pdf/",
      description: "Everything you need to know about relational databases and SQL queries."
    }
  ];

  return (
    <div className="resources-wrapper">
      <div className="resources-container animated-in">
        <header className="resources-header">
          <h1 className="selection-title">Learning Resources</h1>
          <p className="motivation-text">Curated videos and materials to help you master your favorite languages.</p>
        </header>

        <div className="resource-grid">
          {resourceData.map((res) => (
            <div key={res.id} className="resource-card glass-effect">
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${res.ytId}`}
                  title={res.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="resource-info">
                <h2 className="feedback-status">{res.title}</h2>
                <p className="resource-desc">{res.description}</p>
                <a href={res.pdfUrl} target="_blank" rel="noopener noreferrer" className="finish-btn-styled download-btn">
                  Download PDF Guide
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
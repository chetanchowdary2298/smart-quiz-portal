import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import founderPic from "../assets/chetan1.jpeg";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-wrapper">
      <div className="about-glass-card animated-in">
        {/* Header Section */}
        <section className="about-hero">
          <h1 className="selection-title">About SmartQuiz</h1>
          <p className="motivation-text">
            SmartQuiz is a cutting-edge assessment platform designed to bridge the gap between learning and mastery. 
            By providing real-time feedback, detailed performance analytics, and a seamless testing environment, 
            we empower developers and students to sharpen their skills in Python, Java, and beyond. Whether 
            you are preparing for an exam or a technical interview, our platform is built to provide the 
            insights you need to succeed.
          </p>
        </section>

        <hr className="about-divider" />

        {/* Founder Section */}
        <section className="founder-section">
          <h2 className="feedback-status">Meet the Founder</h2>
          <div className="founder-card">
            <div className="founder-image-container">
  <img src={founderPic} alt="chetan" className="founder-photo" />
</div>
            <div className="founder-info">
              <h3 className="score-text">CHETAN CHOWDARY</h3>
              <p className="motivation-text">
                As a passionate software developer and educator, I built SmartQuiz to solve the 
                challenges I faced while tracking progress in complex programming topics. My 
                goal is to make high-quality assessment tools accessible to everyone.
              </p>
              <div className="social-links">
                <a href="#"><FaLinkedin className="social-icon" /></a>
                <a href="#"><FaGithub className="social-icon" /></a>
                <a href="#"><FaEnvelope className="social-icon" /></a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
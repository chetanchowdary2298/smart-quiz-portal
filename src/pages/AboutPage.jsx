import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

import founderPic from "../assets/chetan1.jpeg";
import abhiramPic from "../assets/abhiram.jpeg";
import pankajPic from "../assets/pankaj.jpeg";
import shivaniPic from "../assets/shivani.jpeg";
import meghanaPic from "../assets/meghana.jpeg";
import kavyaPic from "../assets/kavya.jpeg";

import "./AboutPage.css";

const teamMembers = [
  {
    name: "CHETAN CHOWDARY",
    designation: "Founder • Lead Developer • Full-Stack Developer",
    image: founderPic,
    description:
      "As a passionate software developer and educator, I built SmartQuiz to solve the challenges I faced while tracking progress in complex programming topics. My goal is to make high-quality assessment tools accessible to everyone.",
    founder: true,
  },
  {
    name: "M. ABHIRAM RAO",
    designation: "Co-Founder • Full-Stack Developer",
    image: abhiramPic,
    description:
      "Contributing to the development of SmartQuiz with a focus on building reliable and user-friendly full-stack solutions.",
  },
  {
    name: "SHIVANI",
    designation: "UI/UX Designer",
    image: shivaniPic,
    description:
      "Focused on creating clean, intuitive, and engaging user experiences that make SmartQuiz simple and enjoyable to use.",
  },
  {
    name: "MEGHANA",
    designation: "Backend Developer",
    image: meghanaPic,
    description:
      "Working on the backend systems and functionality that support the SmartQuiz platform and its assessment features.",
  },
  {
    name: "PANKAJ MALIPATEL",
    designation: "Full-Stack Developer",
    image: pankajPic,
    description:
      "Contributing across frontend and backend development to build efficient and reliable features for SmartQuiz.",
  },
  {
    name: "KAVYA",
    designation: "UI/UX Developer",
    image: kavyaPic,
    description:
      "Combining design and frontend development to create visually appealing and responsive SmartQuiz interfaces.",
  },
];

const AboutPage = () => {
  return (
    <div className="about-wrapper">
      <div className="about-glass-card animated-in">

        {/* Header Section */}
        <section className="about-hero">
          <h1 className="selection-title">About SmartQuiz</h1>

          <p className="motivation-text">
            SmartQuiz is a cutting-edge assessment platform designed to bridge
            the gap between learning and mastery. By providing real-time
            feedback, detailed performance analytics, and a seamless testing
            environment, we empower developers and students to sharpen their
            skills in Python, Java, and beyond. Whether you are preparing for
            an exam or a technical interview, our platform is built to provide
            the insights you need to succeed.
          </p>
        </section>

        <hr className="about-divider" />

        {/* Team Section */}
        <section className="founder-section">
          <h2 className="feedback-status">Meet the Team</h2>

          <div className="team-container">
            {teamMembers.map((member, index) => (
              <div className="founder-card team-card" key={index}>

                <div className="founder-image-container">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="founder-photo"
                  />
                </div>

                <div className="founder-info">
                  <h3 className="score-text">{member.name}</h3>

                  <p className="team-designation">
                    {member.designation}
                  </p>

                  <p className="motivation-text team-description">
                    {member.description}
                  </p>

                  {member.founder && (
                    <div className="social-links">
                      <a href="#" aria-label="LinkedIn">
                        <FaLinkedin className="social-icon" />
                      </a>

                      <a href="#" aria-label="GitHub">
                        <FaGithub className="social-icon" />
                      </a>

                      <a href="#" aria-label="Email">
                        <FaEnvelope className="social-icon" />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
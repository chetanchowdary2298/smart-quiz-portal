import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-image-wrapper">
      <div className="overlay-content">
        <h1 className="main-tagline">Sharpen Your Logic. One Question at a Time.</h1>
        <p className="sub-tagline">Practice. Learn. Master any programming language.</p>
        <p className="sub-tagline">From syntax to success — quiz it all.</p>
        <button className="animated-btn" onClick={() => navigate('/login')}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;

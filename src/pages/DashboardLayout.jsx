import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, NavLink, Outlet } from 'react-router-dom';
import './DashboardLayout.css';
import { FaUser, FaHeadset, FaArrowLeft } from 'react-icons/fa';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to check for uploaded profile picture changes dynamically
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Read user cache dynamically on mount/location changes to catch updates
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (savedUser.profilePic) {
      setProfilePic(savedUser.profilePic);
    } else {
      setProfilePic(null);
    }
  }, [location.pathname]); // Triggers auto-sync when navigating back from Account page

  const isHomePage = location.pathname === '/dashboard';

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SmartQuiz</h2>
          {!isHomePage && (
            <FaArrowLeft
              className="back-arrow"
              onClick={() => navigate('/dashboard')}
              title="Back to Home"
            />
          )}
        </div>
        <nav className="nav-links">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Home
          </NavLink>
          <NavLink to="/dashboard/test" className="nav-item">Test</NavLink>
          <NavLink to="/dashboard/reports" className="nav-item">Reports</NavLink>
          <NavLink to="/dashboard/about" className="nav-item">About</NavLink>
          <NavLink to="/dashboard/resources" className="nav-item">Resources</NavLink>
        </nav>
      </aside>  

      <div className="main-content-wrapper">
        <div className="top-right-icons" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Renders a prominent 40px user profile picture thumbnail if available, falls back to FaUser */}
          {profilePic ? (
            <img 
              src={profilePic} 
              alt="User Profile" 
              onClick={() => navigate('/dashboard/account')} 
              className="icon"
              title="Account" 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                cursor: 'pointer',
                border: '2px solid #00d2ff',
                boxShadow: '0 0 10px rgba(0, 210, 255, 0.3)',
                transition: 'all 0.2s ease-in-out'
              }} 
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.08)';
                e.target.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 0 10px rgba(0, 210, 255, 0.3)';
              }}
            />
          ) : (
            <FaUser 
              onClick={() => navigate('/dashboard/account')} 
              className="icon" 
              title="Account" 
              style={{ fontSize: '20px', cursor: 'pointer' }} 
            />
          )}

          <FaHeadset 
            onClick={() => navigate('/dashboard/support')} 
            className="icon" 
            title="Support" 
            style={{ fontSize: '20px', cursor: 'pointer' }}
          />
        </div>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
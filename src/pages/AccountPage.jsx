import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import './AccountPage.css';

const AccountPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Core profile state variables mapping credentials alongside fallback values
  const [userData, setUserData] = useState({ 
    username: "Guest", 
    email: "Not Available",
    bio: "Passionate programmer learning new technologies day by day.",
    profilePic: null 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", email: "", bio: "" });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    
    const profileData = {
      username: savedUser.username || "yashuu",
      email: savedUser.email || (savedUser.username ? `${savedUser.username}@smartquiz.com` : "yashwanth@smartquiz.com"),
      bio: savedUser.bio || "Passionate programmer learning new technologies day by day.",
      profilePic: savedUser.profilePic || null
    };

    setUserData(profileData);
    setEditForm({
      username: profileData.username,
      email: profileData.email,
      bio: profileData.bio
    });
  }, []);

  // Opens file picker window when clicking user avatar profile circle
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Convert uploaded image to Base64 data asset for persistent storage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedData = { ...userData, profilePic: reader.result };
        setUserData(updatedData);
        
        // Sync straight to client cache mapping storage keys
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...savedUser, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle edit configuration display inputs frames
  const handleEditToggle = () => {
    setEditForm({
      username: userData.username,
      email: userData.email,
      bio: userData.bio
    });
    setIsEditing(true);
  };

  // Handles updates and pushes data to browser cache arrays
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedData = {
      ...userData,
      username: editForm.username,
      email: editForm.email,
      bio: editForm.bio
    };
    
    setUserData(updatedData);
    setIsEditing(false);

    // Save back to local storage parameters cleanly
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({
      ...savedUser,
      username: editForm.username,
      email: editForm.email,
      bio: editForm.bio
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="account-container">
      <div className="account-glass-card animated-fade-in">
        
        {/* Profile Header Section */}
        <div className="profile-hero">
          <div 
            className="avatar-glow-wrapper" 
            onClick={triggerFileSelect} 
            style={{ 
              cursor: 'pointer', 
              position: 'relative', 
              display: 'inline-block',
              margin: '0 auto'
            }}
          >
            {userData.profilePic ? (
              <img 
                src={userData.profilePic} 
                alt="Profile" 
                className="main-avatar-image" 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '3px solid #00d2ff' 
                }} 
              />
            ) : (
              <FaUserCircle className="main-avatar-icon" />
            )}
            
            {/* 🎯 FIXED: Repositioned Camera Icon Badge clearly to overlay on the lower right side */}
            <div 
              className="camera-overlay-badge" 
              style={{ 
                position: 'absolute', 
                bottom: '4px', 
                right: '4px', 
                background: '#00d2ff', 
                padding: '8px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff', 
                fontSize: '14px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                zIndex: '10',
                border: '2.5px solid #0f172a' // Matches your panel background hue context
              }}
            >
              <FaCamera />
            </div>
            
            {/* Online indicator placement adjusted via lower z-index boundary */}
            <div className="online-pulse" style={{ zIndex: '5' }}></div>
          </div>
          
          {/* Hidden File Upload Element */}
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={handleImageChange} 
          />

          <h1 className="user-display-name" style={{ marginTop: '16px' }}>{userData.username}</h1>
          
          {/* Bio Field Container */}
          <p className="user-bio-text" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', maxWidth: '340px', margin: '8px auto 0 auto', fontStyle: 'italic', lineHeight: '1.4' }}>
            {userData.bio}
          </p>
        </div>

        {/* Dynamic Display Layout vs Interactive Profile Editor Form Block */}
        {!isEditing ? (
          <>
            <div className="info-sections-grid">
              <div className="info-box">
                <div className="info-icon-circle"><FaEnvelope /></div>
                <div className="info-content">
                  <label>Email Address</label>
                  <p>{userData.email}</p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon-circle"><FaShieldAlt /></div>
                <div className="info-content">
                  <label>Account Status</label>
                  <p className="status-highlight">Verified & Active</p>
                </div>
              </div>
            </div>

            <div className="account-btn-group">
              <button className="primary-edit-btn" onClick={handleEditToggle}>
                <FaEdit /> Edit Profile
              </button>
              <button className="secondary-logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout from Account
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', marginTop: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              
              <div>
                <label style={{ color: '#00d2ff', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Username</label>
                <input 
                  type="text" 
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '6px', color: '#fff', fontSize: '15px', outline: 'none' }}
                  required
                />
              </div>

              <div>
                <label style={{ color: '#00d2ff', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '6px', color: '#fff', fontSize: '15px', outline: 'none' }}
                  required
                />
              </div>

              <div>
                <label style={{ color: '#00d2ff', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Bio Description</label>
                <textarea 
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows="3"
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none', lineHeight: '1.4' }}
                />
              </div>

            </div>

            <div className="account-btn-group" style={{ marginTop: '8px' }}>
              <button type="submit" className="primary-edit-btn" style={{ backgroundColor: '#28a745' }}>
                <FaSave /> Save Changes
              </button>
              <button type="button" className="secondary-logout-btn" onClick={() => setIsEditing(false)} style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default AccountPage;
import React, { useState, useEffect } from 'react';
import { FaUsers, FaTasks, FaChartLine, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 124, totalQuizzes: 45, avgScore: "78%" });
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, user: "yashuu", action: "Completed Python Quiz", time: "2 mins ago" },
    { id: 2, user: "chetan", action: "Started Java Test", time: "10 mins ago" },
  ]);

  return (
    <div className="admin-wrapper animated-fade-in">
      <header className="admin-header">
        <h1 className="selection-title">Admin Command Center</h1>
        <p className="motivation-text">Monitor platform performance and manage user activities.</p>
      </header>

      {/* Analytics Overview */}
      <div className="stats-grid">
        <div className="stat-card glass-effect">
          <FaUsers className="stat-icon cyan" />
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card glass-effect">
          <FaTasks className="stat-icon green" />
          <div className="stat-info">
            <h3>{stats.totalQuizzes}</h3>
            <p>Quizzes Hosted</p>
          </div>
        </div>
        <div className="stat-card glass-effect">
          <FaChartLine className="stat-icon purple" />
          <div className="stat-info">
            <h3>{stats.avgScore}</h3>
            <p>Average Performance</p>
          </div>
        </div>
      </div>

      <div className="admin-content-grid">
        {/* User Management Section */}
        <div className="admin-glass-card user-table-section">
          <div className="card-header">
            <h3>User Management</h3>
            <button className="add-btn"><FaPlus /> Add User</button>
          </div>
          <div className="admin-table">
            <div className="table-row head">
              <span>User</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {recentActivities.map(act => (
              <div key={act.id} className="table-row">
                <span>{act.user}</span>
                <span className="status-badge">Active</span>
                <div className="action-btns">
                  <FaEdit className="edit-ico" />
                  <FaTrash className="del-ico" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed Section */}
        <div className="admin-glass-card activity-feed">
          <h3>Live Activity</h3>
          <div className="feed-list">
            {recentActivities.map(act => (
              <div key={act.id} className="feed-item">
                <div className="feed-dot"></div>
                <div className="feed-details">
                  <p><strong>{act.user}</strong> {act.action}</p>
                  <span>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
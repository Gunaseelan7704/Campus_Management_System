import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Dashboard.css';

const StudentDashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Student Dashboard</h3>
        <ul>
          <li><Link to="/student-dashboard">Profile</Link></li>
          <li><Link to="/student-dashboard/notices">Notices</Link></li>
          <li><Link to="/student-dashboard/assignments">Assignments</Link></li>
          <li><Link to="/student-dashboard/view-attendance">My Attendance</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
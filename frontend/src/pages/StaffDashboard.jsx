import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Dashboard.css';

const StaffDashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Staff Dashboard</h3>
        <ul>
          <li><Link to="/staff-dashboard">Profile</Link></li>
          <li><Link to="/staff-dashboard/notices">Notices</Link></li>
          <li><Link to="/staff-dashboard/create-notice">Create Notice</Link></li>
          <li><Link to="/staff-dashboard/assignments">Assignments</Link></li>
          <li><Link to="/staff-dashboard/create-assignment">Create Assignment</Link></li>
          <li><Link to="/staff-dashboard/mark-attendance">Mark Attendance</Link></li>
          <li><Link to="/staff-dashboard/view-attendance">View Attendance</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default StaffDashboard;
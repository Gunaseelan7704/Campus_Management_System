import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <ul>
          <li><Link to="/admin-dashboard">Profile</Link></li>
          <li><Link to="/admin-dashboard/manage-users">Manage Users</Link></li>
          <li><Link to="/admin-dashboard/notices">Notices</Link></li>
          <li><Link to="/admin-dashboard/create-notice">Create Notice</Link></li>
          <li><Link to="/admin-dashboard/attendance">Attendance</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
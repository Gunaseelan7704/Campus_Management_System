import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Notices.css';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/notices', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotices(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="notices-container">
      <div className="notices-header">
        <h2>Notices</h2>
        {(role === 'admin' || role === 'staff') && (
          <Link to={role === 'admin' ? '/admin-dashboard/create-notice' : '/staff-dashboard/create-notice'} className="btn-create">
            Create Notice
          </Link>
        )}
      </div>
      <div className="notices-list">
        {notices.length === 0 ? (
          <p>No notices available</p>
        ) : (
          notices.map(notice => (
            <div key={notice._id} className="notice-card">
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <div className="notice-footer">
                <span>Posted by: {notice.createdBy.name}</span>
                <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notices;
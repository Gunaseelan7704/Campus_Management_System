import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateNotice.css';

const CreateNotice = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetRoles: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        targetRoles: [...formData.targetRoles, value]
      });
    } else {
      setFormData({
        ...formData,
        targetRoles: formData.targetRoles.filter(role => role !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || formData.targetRoles.length === 0) {
      setError('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/notices', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(role === 'admin' ? '/admin-dashboard/notices' : '/staff-dashboard/notices');
    } catch (err) {
      console.error(err);
      setError('Failed to create notice');
    }
  };

  return (
    <div className="create-notice">
      <h2>Create New Notice</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Target Audience</label>
          <div className="checkbox-group">
            {role === 'admin' && (
              <label>
                <input
                  type="checkbox"
                  value="admin"
                  checked={formData.targetRoles.includes('admin')}
                  onChange={handleCheckboxChange}
                />
                Admins
              </label>
            )}
            <label>
              <input
                type="checkbox"
                value="staff"
                checked={formData.targetRoles.includes('staff')}
                onChange={handleCheckboxChange}
              />
              Staff
            </label>
            <label>
              <input
                type="checkbox"
                value="student"
                checked={formData.targetRoles.includes('student')}
                onChange={handleCheckboxChange}
              />
              Students
            </label>
          </div>
        </div>
        <button type="submit" className="btn-submit">Create Notice</button>
      </form>
    </div>
  );
};

export default CreateNotice;
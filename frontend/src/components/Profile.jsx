import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    contactNumber: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          department: response.data.department || '',
          contactNumber: response.data.contactNumber || '',
          address: response.data.address || ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/login');
        }
        setError('Failed to fetch profile data');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfile(response.data);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!profile) {
    return (
      <div className="profile-container">
        <h2>My Profile</h2>
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {!editMode ? (
        <div className="profile-info">
          <div className="profile-field">
            <span className="field-label">Name:</span>
            <span className="field-value">{profile.name}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{profile.email}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Role:</span>
            <span className="field-value capitalize">{profile.role}</span>
          </div>
          {profile.department && (
            <div className="profile-field">
              <span className="field-label">Department:</span>
              <span className="field-value">{profile.department}</span>
            </div>
          )}
          {profile.contactNumber && (
            <div className="profile-field">
              <span className="field-label">Contact:</span>
              <span className="field-value">{profile.contactNumber}</span>
            </div>
          )}
          {profile.address && (
            <div className="profile-field">
              <span className="field-label">Address:</span>
              <span className="field-value">{profile.address}</span>
            </div>
          )}
          
          <button 
            onClick={() => setEditMode(true)} 
            className="btn-edit"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-save">
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => setEditMode(false)} 
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
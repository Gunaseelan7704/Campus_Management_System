import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateAssignment.css';

const CreateAssignment = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxMarks: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.dueDate || !formData.maxMarks) {
      setError('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/assignments', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/staff-dashboard/assignments');
    } catch (err) {
      console.error(err);
      setError('Failed to create assignment');
    }
  };

  return (
    <div className="create-assignment">
      <h2>Create New Assignment</h2>
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
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Max Marks</label>
          <input
            type="number"
            name="maxMarks"
            value={formData.maxMarks}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignment;
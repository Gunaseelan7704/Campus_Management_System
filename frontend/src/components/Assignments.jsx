import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Assignments.css';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/assignments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignments(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <h2>Assignments</h2>
        {role === 'staff' && (
          <Link to="/staff-dashboard/create-assignment" className="btn-create">
            Create Assignment
          </Link>
        )}
      </div>
      <div className="assignments-list">
        {assignments.length === 0 ? (
          <p>No assignments available</p>
        ) : (
          assignments.map(assignment => (
            <div key={assignment._id} className="assignment-card">
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <div className="assignment-details">
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                <span>Max Marks: {assignment.maxMarks}</span>
                <span>Created by: {assignment.createdBy.name}</span>
              </div>
              {role === 'student' && (
                <Link to={`/student-dashboard/submit-assignment/${assignment._id}`} className="btn-submit">
                  {assignment.submissions.some(sub => sub.student._id === localStorage.getItem('userId')) 
                    ? 'View Submission' 
                    : 'Submit Assignment'}
                </Link>
              )}
              {role === 'staff' && (
                <Link to={`/staff-dashboard/assignment/${assignment._id}`} className="btn-view">
                  View Submissions
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;
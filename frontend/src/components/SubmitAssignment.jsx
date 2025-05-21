import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SubmitAssignment.css';

const SubmitAssignment = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submission, setSubmission] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/assignments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignment(res.data);
        
        const existingSubmission = res.data.submissions.find(
          sub => sub.student._id === localStorage.getItem('userId')
        );
        if (existingSubmission) setSubmission(existingSubmission);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/assignments/${id}/submit`,
        { fileUrl: uploadRes.data.fileUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/student-dashboard/assignments');
    } catch (err) {
      console.error(err);
      setError('Failed to submit assignment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div className="submit-assignment">
      <h2>Submit Assignment: {assignment.title}</h2>
      {submission ? (
        <div className="submission-details">
          <h3>You have already submitted this assignment</h3>
          <p>Submitted on: {new Date(submission.submittedAt).toLocaleString()}</p>
          {submission.marks && <p>Marks: {submission.marks}/{assignment.maxMarks}</p>}
          {submission.feedback && <p>Feedback: {submission.feedback}</p>}
          <button onClick={() => navigate('/student-dashboard/assignments')} className="btn-back">
            Back to Assignments
          </button>
        </div>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload Assignment File</label>
              <input
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit">Submit Assignment</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SubmitAssignment;
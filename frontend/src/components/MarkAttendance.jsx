import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarkAttendance.css';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('present');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
          params: { role: 'student' }
        });
        setStudents(res.data);
        if (res.data.length > 0) setSelectedStudent(res.data[0]._id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !date || !status) {
      setError('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/attendance',
        { studentId: selectedStudent, date, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Attendance marked successfully');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to mark attendance');
      setSuccess('');
    }
  };

  if (loading) return <div>Loading students...</div>;

  return (
    <div className="mark-attendance">
      <h2>Mark Attendance</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.department || 'No department'})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Mark Attendance</button>
      </form>
    </div>
  );
};

export default MarkAttendance;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = role === 'student' 
          ? `http://localhost:5000/api/attendance/student/${localStorage.getItem('userId')}`
          : 'http://localhost:5000/api/attendance';
        
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAttendance(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [role]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="attendance-container">
      <h2>{role === 'student' ? 'My Attendance' : 'Attendance Records'}</h2>
      {attendance.length === 0 ? (
        <p>No attendance records found</p>
      ) : (
        <table>
          <thead>
            <tr>
              {role !== 'student' && <th>Student</th>}
              <th>Date</th>
              <th>Status</th>
              <th>Marked By</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(record => (
              <tr key={record._id}>
                {role !== 'student' && <td>{record.student.name}</td>}
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td className={`status-${record.status}`}>{record.status}</td>
                <td>{record.markedBy.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attendance;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './components/Profile';
import ManageUsers from './components/admin/ManageUsers';
import Notices from './components/Notices';
import CreateNotice from './components/CreateNotice';
import Assignments from './components/Assignments';
import CreateAssignment from './components/CreateAssignment';
import SubmitAssignment from './components/SubmitAssignment';
import Attendance from './components/Attendance';
import MarkAttendance from './components/MarkAttendance';
import ViewAttendance from './components/ViewAttendance';

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        }>
          <Route index element={<Profile />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="notices" element={<Notices />} />
          <Route path="create-notice" element={<CreateNotice />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
        
        {/* Staff Routes */}
        <Route path="/staff-dashboard" element={
          <PrivateRoute allowedRoles={['staff']}>
            <StaffDashboard />
          </PrivateRoute>
        }>
          <Route index element={<Profile />} />
          <Route path="notices" element={<Notices />} />
          <Route path="create-notice" element={<CreateNotice />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="create-assignment" element={<CreateAssignment />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="view-attendance" element={<ViewAttendance />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student-dashboard" element={
          <PrivateRoute allowedRoles={['student']}>
            <StudentDashboard />
          </PrivateRoute>
        }>
          <Route index element={<Profile />} />
          <Route path="notices" element={<Notices />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="submit-assignment/:id" element={<SubmitAssignment />} />
          <Route path="view-attendance" element={<ViewAttendance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
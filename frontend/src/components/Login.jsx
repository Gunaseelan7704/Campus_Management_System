import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(''); // Can be email, ID, or roll number
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!input || !password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: input, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token); 
      localStorage.setItem('role', data.user.role);  // ← fix here
      switch (data.user.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'staff':
          navigate('/staff-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('An error occurred during login');
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <div className="login-main">
          <div className="login-header">Enter your credentials</div>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
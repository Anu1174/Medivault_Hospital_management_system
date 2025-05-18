import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig'; // Make sure this file exists and is configured
import './Form.css';

const PatientLogin = () => {
  const navigate = useNavigate();
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!uniqueId || !password) {
      setError('Please enter both Patient ID and Password.');
      return;
    }

    try {
      const res = await api.post('/patient-login', {
        uniqueId,
        password,
      });

      if (res.data.success) {
        // Redirect to patient dashboard on success
        navigate('/patient-dashboard');
      } else {
        setError(res.data.message || 'Invalid Patient ID or Password.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Patient ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="forgot-password" onClick={() => navigate('/reset-password')}>
          Forgot Password?
        </p>
        <button className="login-button" onClick={() => navigate('/patient-dashboard')}>Login</button>
      </form>
      <p className="new-user-text">New to the website?</p>
      <button className="register-button" onClick={() => navigate('/register/patient')}>
        Register
      </button>
    </div>
  );
};

export default PatientLogin;

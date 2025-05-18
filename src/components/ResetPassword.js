// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import api from '../axiosConfig'; // Axios for API calls

const ResetPassword = () => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/reset-password', {
        patientId: 'some_patient_id', // You should dynamically get the patient ID
        newPassword: newPass,
      });

      console.log(response.data.message); // Password reset success message
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default ResetPassword;

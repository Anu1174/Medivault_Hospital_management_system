import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SetupPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';  // Extract email from location.state

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{4,})(?=.*[\#\@\*])(?=.*\d{1,3}).{8,}$/;
    return regex.test(password);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/api/patient/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      // Send SMS after successful registration
      const smsResponse = await sendSMS(formData.contact, data.uniqueId);

      if (smsResponse.success) {
        alert(`Patient ID sent to ${formData.contact}`);
        // Only navigate to the password setup page if SMS is sent successfully
        navigate('/setup-password', { state: { email: formData.email } });
      } else {
        // Handle failure in SMS sending
        alert('Failed to send SMS. Please try again.');
      }
    } else {
      setError(data.message || 'Registration failed.');
    }
  } catch (err) {
    console.error(err);
    setError('Server error. Please try again.');
  }
};
const handleRegister = async () => {
  try {
    const res = await api.post('/register', formData);
    if (res.data.success) {
      const userUniqueId = res.data.uniqueId; // ✅ GET THIS FROM BACKEND
      navigate(`/set-password?uniqueId=${userUniqueId}`); // ✅ Use here
    } else {
      setError(res.data.message);
    }
  } catch (err) {
    console.error(err);
    setError('Registration failed.');
  }
};

  return (
    <div className="form-container">
      <h2>Set Your Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Done</button>
      
      </form>
    </div>
  );
};

export default SetupPassword;

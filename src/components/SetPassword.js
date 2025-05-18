import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegisterForm.css';


const SetPassword = () => {
const location = useLocation();
const { email, uniqueId } = location.state || {};
const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!uniqueId) {
      setError('');
    }
  }, [uniqueId]);

  const validatePassword = (pwd) => {
    const startsWithCapital = /^[A-Z]/.test(pwd);
    const digitCount = (pwd.match(/\d/g) || []).length;
    const specialCharMatch = pwd.match(/[!#@%*]/g) || [];
    const hasOnlyAllowedChars = /^[A-Za-z0-9!#@%*]+$/.test(pwd);

    return (
      startsWithCapital &&
      digitCount >= 1 &&
      specialCharMatch.length >= 1 &&
      hasOnlyAllowedChars
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
    setError("Password must contain at least 1 uppercase letter, 4 lowercase letters, 1 special character, 1-3 digits, and be 8+ characters.");
    return;
  }

    try {
      const res = await fetch('http://localhost:5000/api/patient/set-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, uniqueId, password }),
});


      if (res.data.success) {
        setSuccess('Password set successfully!');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      } else {
        setError(res.data.message || 'Failed to set password.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Your Password</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {!success && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p className="disclaimer">
            Password must:
            <ul>
              <li>Start with a capital letter</li>
              <li>Contain at least 1 digit</li>
              <li>Contain at least 1 special character (!, #, @, %, *)</li>
              <li>Only include allowed characters (A-Z, a-z, 0-9, !, #, @, %, *)</li>
              <li>Match the Confirm Password</li>
            </ul>
          </p>
          <button type="submit" onClick={() => navigate('/patient-login')}>Done</button>
        </form>
      )}
    </div>
  );
};

export default SetPassword;

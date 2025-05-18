// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const ForgotPassword = () => {
  const navigate = useNavigate();

  // ✅ Define state variables
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);

  const handleSendLink = () => {
    // Simulate email sending
    if (email.trim() !== '') {
      setLinkSent(true);
      console.log(`Reset link sent to: ${email}`);
      navigate('/login');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {!linkSent ? (
        <>
          <p>Please enter your registered email to receive a reset link:</p>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendLink}>Send Reset Link</button>
        </>
      ) : (
        <p>A reset link has been sent to <strong>{email}</strong>.</p>
      )}
    </div>
  );
};

export default ForgotPassword;

// src/components/LoginForm.js

import React, { useState } from 'react';
import './Form.css';

function LoginForm({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log(`Logging in ${role} with email: ${email}`);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{role} Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p
  className="forgot-password"
  onClick={() => navigate('/forgot-password')}
>
  Forgot Password?
</p>

    </form>
    
  );
}

export default LoginForm;

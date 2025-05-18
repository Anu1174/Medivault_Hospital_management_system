// src/components/RoleSelection.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import doctorImg from '../assets/Doctor.png';
import patientImg from '../assets/Patient.png';
import './RoleSelection.css'; // import CSS

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-selection-container">
      <header className="header">
        <img src={logo} alt="Website Logo" className="logo" />
      </header>

      <main className="main-content">
        <h2 className="welcome-text">!! Welcome to MediVault !! </h2>
        <h3>Choose Your Role</h3>

        <div className="role-buttons">
          <div className="role-card" onClick={() => navigate('/patient-login')}>
            <img src={patientImg} alt="Patient" className="role-image" />
            <button className="role-button">Patient</button>
          </div>

          <div className="role-card" onClick={() => navigate('/doctor-login')}>
            <img src={doctorImg} alt="Doctor" className="role-image" />
            <button className="role-button">Doctor</button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 MediVault. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RoleSelection;

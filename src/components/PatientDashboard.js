import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import MedicalImg from '../assets/History.png';
import doctorImg from '../assets/Doctor.png';
import './PatientDashboard.css'; // create this CSS file for styling

function PatientDashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // Dummy data for demonstration — you can fetch this from backend/localStorage
  const patientData = {
    id: 'P1747244364807',
    name: 'Anu Gudi',
    email: 'anu@example.com',
    phone: '9518320637',
    age: 21,
    gender: 'Female',
  };

  const handleLogout = () => {
    // Clear tokens/localStorage if needed
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="center-header">
          <h2>Welcome, {patientData.name}!</h2>
          <p className="slogan">## Here is all solutions to your problem  ##</p>
        </div>
        <div className="header-right">

          <button className="profile-text" onClick={() => setShowProfile(!showProfile)}>Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {showProfile && (
        <div className="profile-popup">
          <h3>Patient Details</h3>
          <p><strong>ID:</strong> {patientData.id}</p>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>Phone:</strong> {patientData.phone}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
        </div>
      )}

      <main className="dashboard-main">
        <div className="card">
  <img src={MedicalImg} alt="Medical History" />
  <button onClick={() => navigate('/MedicalHistory')}>Medical History</button>
</div>

<div className="card">
  <img src={doctorImg} alt="Doctor" className="role-image" />
  <button onClick={() => navigate('/doctor-recommendation')}>Doctor Recommendation</button>
</div>

      </main>

      <Footer />
    </div>
  );
}

export default PatientDashboard;


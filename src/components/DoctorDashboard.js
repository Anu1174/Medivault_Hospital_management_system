// src/components/DoctorDashboard.js
import React, { useState } from 'react';
import './DoctorDashboard.css'; // Optional for styling
import { useNavigate } from 'react-router-dom';
import PatientHistoryImg from '../assets/PatientHistory.png';
import AppointmentsImg from '../assets/Appointments.png';
import PatientImg from '../assets/Patient.png';
import Footer from './Footer';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

   const DoctorData = {
    id: 'D1747245249450',
    name: 'Dr.Arushi Sharma',
    email: 'anugudi11@gmail.com',
    phone: '9518320637',
    age: 25,
    gender: 'Female',
    specialization: 'Cardeologist',
    experience: '5 Years'
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorToken'); // if using auth
    navigate('/'); // go to role selection or login
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="center-header">
          <h2>Welcome, {DoctorData.name}!</h2>
          <p className="slogan">## Here is all solutions to your problem  ##</p>
        </div>
        <div className="header-right">

          <button className="profile-text" onClick={() => setShowProfile(!showProfile)}>Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {showProfile && (
        <div className="profile-popup">
          <h3>Doctor Details</h3>
          <p><strong>ID:</strong> {DoctorData.id}</p>
          <p><strong>Name:</strong> {DoctorData.name}</p>
          <p><strong>Age:</strong> {DoctorData.age}</p>
          <p><strong>Gender:</strong> {DoctorData.gender}</p>
          <p><strong>Email:</strong> {DoctorData.email}</p>
          <p><strong>Phone:</strong> {DoctorData.phone}</p>
          <p><strong>Specialization:</strong> {DoctorData.specialization}</p>
          <p><strong>Experience:</strong> {DoctorData.experience}</p>
    
        </div>
      )}

      <div className="dashboard-sections">
        <section className="dashboard-card" onClick={() => navigate('/view-patient-history')}>
          <img src={PatientHistoryImg} alt="View History" />
          <h2> View Patient History</h2>
          <p>Access medical records of patients with consent.</p>
        </section>

        <section className="dashboard-card" onClick={() => navigate('/patients-treated')}>
          <img src={PatientImg} alt="Patient Treated" />
          <h2> Patients Treated</h2>
          <p>List of all patients consulted and treated.</p>
        </section>

        <section className="dashboard-card" onClick={() => navigate('/appointments')}>
          <img src={AppointmentsImg} alt="Appointments" />
          <h2> Appointments Assigned</h2>
          <p>Check upcoming or past appointments.</p>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default DoctorDashboard;

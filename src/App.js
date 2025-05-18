/// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import PatientLogin from './components/PatientLogin';
import DoctorLogin from './components/DoctorLogin';
import PatientRegister from './components/PatientRegister';
import DoctorRegister from './components/DoctorRegister';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SetPassword from './components/SetPassword';
import SetupPassword from './components/SetupPassword';
import PatientProfile from './components/patientprofile';
import MedicalHistory from './components/MedicalHistory';
import ViewPatientHistory from './components/ViewPatientHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/setup-password" element={<SetupPassword />} />
        <Route path="/patientprofile" element={<PatientProfile />} />
        <Route path="/view-patient-history" element={<ViewPatientHistory />} />
        <Route path="/Medicalhistory" element={<MedicalHistory />} />


      </Routes>
    </Router>
  );
}

export default App;

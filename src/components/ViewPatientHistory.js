// src/components/ViewPatientHistory.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MedicalHistory from './MedicalHistory'; // component to display history

const ViewPatientHistory = () => {
  const [patientId, setPatientId] = useState('');
  const [consentGiven, setConsentGiven] = useState(null); // null = pending, true = allowed
  const [showPopup, setShowPopup] = useState(false);
  const [patientName] = useState('Anu Gudi'); // ideally fetched
  const doctorName = 'Dr. Arushi Sharma';
  const navigate = useNavigate();

  const handleRequestAccess = () => {
    if (patientId.trim() === '') return;
    // simulate sending email and popup for now
    setShowPopup(true);
  };

  const handleConsent = (allowed) => {
    setConsentGiven(allowed);
    setShowPopup(false);
  };

  const handleDone = () => {
    setConsentGiven(null);
    setPatientId('');
    navigate('/doctor-dashboard');
  };

  return (
    <div style={{ padding: '30px' }}>
      {!consentGiven && (
        <>
          <h2>Enter Patient ID to View Medical History</h2>
          <input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            style={{ padding: '10px', width: '250px' }}
          />
          <button
            onClick={handleRequestAccess}
            style={{ marginLeft: '10px', padding: '10px 20px' }}
          >
            Enter
          </button>
        </>
      )}

      {showPopup && (
        <div className="popup-box" style={{
          background: '#fff',
          border: '1px solid #aaa',
          padding: '20px',
          marginTop: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)'
        }}>
          <h3>Hello!! {patientName}</h3>
          <p>{doctorName} is trying to view your medical history.</p>
          <button onClick={() => handleConsent(true)} style={{ marginRight: '10px' }}>Allow</button>
          <button onClick={() => handleConsent(false)}>Don't Allow</button>
        </div>
      )}

      {consentGiven && (
        <div style={{ marginTop: '30px' }}>
          <MedicalHistory patientId={patientId} />
          <button
            onClick={handleDone}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#007BFF' }}
          >
            Done
          </button>
        </div>
      )}

      {consentGiven === false && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          Access Denied by Patient.
        </div>
      )}
    </div>
  );
};

export default ViewPatientHistory;

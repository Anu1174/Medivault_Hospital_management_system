import React from 'react';

const MedicalHistory = ({ patientId }) => {

  const dummyHistory = [
    {
      doctor: 'Dr. Arushi Singh',
      date: '2024-09-10',
      diagnosis: 'Flu',
      prescription: 'Rest + Flu meds',
    },
    {
      doctor: 'Dr. Ramesh Iyer',
      date: '2024-10-05',
      diagnosis: 'Diabetes Type 2',
      prescription: 'Metformin 500mg daily',
    },
    {
      doctor: 'Dr. Sneha Kulkarni',
      date: '2025-01-15',
      diagnosis: 'Migraine',
      prescription: 'Sumatriptan + Avoid triggers',
    },
  ];



  return (
    <div style={{ padding: '20px' }}>
      <h3>Medical History of Patient ID: {patientId}</h3>
      {dummyHistory.map((entry, index) => (
        <div key={index} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px',
          backgroundColor: '#f9f9f9',
        }}>
          <p><strong>Doctor:</strong> {entry.doctor}</p>
          <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
          <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>
          <p><strong>Prescription:</strong> {entry.prescription}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicalHistory;

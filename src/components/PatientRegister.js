// src/components/PatientRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import api from '../axiosConfig'; // Axios instance

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateContact = (contact) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(contact);
  };

  const areAllFieldsFilled = () => {
    return Object.values(formData).every((val) => val.trim() !== '');
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  // Check if all fields are filled
  if (!areAllFieldsFilled()) {
    setError('Please fill in all the fields.');
    return;
  }

  // Validate contact number
  if (!validateContact(formData.contact)) {
    setError('Invalid contact number. It must be exactly 10 digits.');
    return;
  }

  setIsLoading(true);

  try {
    const res = await api.post('/register/patient', formData);
    const data = res.data;

    if (data.success && data.uniqueId) {
      const uniqueId = data.uniqueId;

      const smsRes = await api.post('/send-sms', {
        contact: formData.contact,
        uniqueId: uniqueId,
      });

      const smsMessage = smsRes.data.message;
      console.log("SMS Response Message:", smsMessage);

      // ✅ Relaxed SMS success check
      if (smsMessage?.toLowerCase().includes('sms')) {
        console.log("Navigating to /set-password", {
          uniqueId: uniqueId,
        });

        navigate('/set-password', {
          state: {

            uniqueId: uniqueId,
          },
        });
      } else {
        setError('SMS failed to send. Try again.');
      }
    } else {
      setError(data.message || 'Registration failed.');
    }
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || 'Server error. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="form-container">
      <h2>Patient Registration</h2>
      {error && <p className="error">{error}</p>}
      {isLoading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          required
          value={formData.age}
          onChange={handleChange}
        />
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          name="contact"
          type="tel"
          placeholder="Contact Number"
          required
          value={formData.contact}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          required
          value={formData.address}
          onChange={handleChange}
        />
        <button className="Submit" onClick={() => navigate('/set-password')}>
          Register
        </button>
      </form>
    </div>
  );
};

export default PatientRegister;

// Load environment variables
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const router = express.Router();
const port = 5000;
console.log("API KEY Used:", process.env.FAST2SMS_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aanu08@1109',
  database: 'hospital_management_system'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// ✅ Fast2SMS Sender Function
const sendSMS = async (phone, message) =>{
  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        sender_id: 'FSTSMS',
        message: message,
        language: 'english',
        route: 'q', // or 't' if you have a transactional route
        numbers: phone
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Fast2SMS response:", response.data);
    return response.data;
  } catch (error) {
    console.error("SMS Error:", error.response ? error.response.data : error);
    return { return: false, error: error.response ? error.response.data : error.message };
  }
};

//////////////////////////
// 🔹 Patient Registration
//////////////////////////
app.post('/register/patient', async (req, res) => {
  const { name, age, gender, contact, email, address } = req.body;

  if (!name || !age || !gender || !contact || !email || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const uniqueId = 'P' + Date.now();
  const query = 'INSERT INTO patients (patient_id, name, age, gender, contact, email, address) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [uniqueId, name, age, gender, contact, email, address], async (err, result) => {
    if (err) {
      console.error('Error inserting patient data:', err);
      return res.status(500).json({ message: 'Internal Server Error while saving patient' });
    }

    const message = `Hello ${name}, your Patient ID is ${uniqueId}. Thank you for registering with MediVault.`;

    try {
      await sendSMS(contact, message);
      return res.status(200).json({ message: 'Patient registered successfully. SMS with Unique ID sent.' });
      (Array.isArray(smsRes.data.message) && smsRes.data.message.includes('SMS sent successfully.'))
    } catch {
      return res.status(500).json({ message: 'Patient registered, but failed to send SMS' });
    }
  });
});

//////////////////////////
// 🔹 Doctor Registration
//////////////////////////
app.post('/register/doctor', async (req, res) => {
  const { name, gender, contact, email, specialization , experience, address} = req.body;

  if (!name || !gender || !contact || !email || !specialization|| !experience|| !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const uniqueId = 'D' + Date.now();
  const query = 'INSERT INTO doctors (doctor_id, name, gender, contact, email, specialization,experience,address) VALUES (?, ?, ?, ?, ?, ?,?,?)';

  db.query(query, [uniqueId, name, gender, contact, email, specialization, experience, address], async (err, result) => {
    if (err) {
      console.error('Error inserting doctor data:', err);
      return res.status(500).json({ message: 'Internal Server Error while saving doctor' });
    }

    const message = `Hello Dr. ${name}, your Doctor ID is ${uniqueId}. Welcome to MediVault!`;

    try {
      await sendSMS(contact, message);
      return res.status(200).json({ message: 'Doctor registered successfully. SMS with Unique ID sent.' });
    } catch {
      return res.status(500).json({ message: 'Doctor registered, but failed to send SMS' });
    }
  });
});

// Route base
app.use('/api', router);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

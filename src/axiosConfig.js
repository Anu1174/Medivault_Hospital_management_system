import axios from 'axios';

// Set the base URL for your API (assuming backend is running on port 5000)
const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
  },// Change this if your backend URL differs
});

export default api;

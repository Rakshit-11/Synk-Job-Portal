// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this with your server's base URL
  withCredentials: true, // Send cookies with every request by default
});

export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://loop-xpress-seller-portal.vercel.app/', // Base URL of your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.BACKEND_BASEURL}`, // Base URL of your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

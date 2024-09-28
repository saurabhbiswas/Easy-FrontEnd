import axios from 'axios';

const axiosInstance = axios.create({
 // baseURL: 'http://localhost:3001',
   baseURL:'http://3.107.101.225:80/',
   headers: { 'Content-Type': 'application/json'},
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

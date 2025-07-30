// =======================================================================
// FILE: src/api/api.js (EDITED FOR DEBUGGING)
// =======================================================================
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
});


// This 'interceptor' runs before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // This log will show us exactly what's happening
  console.log("Interceptor: Attaching token:", token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

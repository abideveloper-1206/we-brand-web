import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000',
  // baseURL: process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002',
});

export default api;

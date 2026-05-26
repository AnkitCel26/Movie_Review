import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Set a timeout if needed
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url?.startsWith('/auth')) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - redirecting to login');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
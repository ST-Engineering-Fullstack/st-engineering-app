import axios from "axios";

// Use localhost for browser requests
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://0.0.0.0:4000/api';

const Axios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

Axios.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export { Axios };

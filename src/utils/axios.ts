import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const Axios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
});
  
export { Axios };

import axios from "axios";

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

const Axios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});
  
export { Axios };

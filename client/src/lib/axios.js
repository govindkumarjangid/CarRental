import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ?
       import.meta.env.VITE_BASE_URL : import.meta.env.VITE_BASE_SERVER_URL,
    withCredentials: true,
});
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ?
        'http://localhost:8080' : 'https://carrental-nezp.onrender.com',
    withCredentials: true,
});
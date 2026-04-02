import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: 'https://carrental-nezp.onrender.com/',
    baseURL:'http://localhost:8080/',
    withCredentials: true,
});

import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://carrental-nezp.onrender.com',
    withCredentials: true,
});
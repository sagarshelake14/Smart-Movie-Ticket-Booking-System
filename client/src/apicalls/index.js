// import axios from "axios";

// export const axiosInstance = axios.create({
//     headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${localStorage.getItem('token')}`
//     },
// });

import axios from "axios";

// 1. Create the instance with basic headers
export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Add an interceptor to inject the token dynamically on every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
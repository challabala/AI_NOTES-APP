import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : 'https://ai-notes-app-f6g5.onrender.com/api');

const api = axios.create({
    baseURL,
    withCredentials: true, // sending cookies
});

api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// We could add response interceptor here for 401 refresh logic
// For simplicity in this demo, we'll just logout on 401 for now or handle in slice
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check if it's not the login endpoint itself
            if (!error.config.url.includes('/login')) {
                 localStorage.removeItem('user');
                 window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;

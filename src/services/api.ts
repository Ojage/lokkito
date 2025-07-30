import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 🔐 Request interceptor to inject token
api.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem('lokkalokkito_user');
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// ⚠️ Optional: Response interceptor for auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn('Unauthorized – possibly expired token');
            // Optional: auto-logout, show modal, redirect, etc.
        }
        return Promise.reject(error);
    }
);

export { api };

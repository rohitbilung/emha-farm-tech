import axios from 'axios';

// 1. Define the URL first so you can use it in both places
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/general';
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const BASE_URL = import.meta.env.VITE_API_BASE_URL
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:5000/api';

// 2. Create the axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

// REQUEST INTERCEPTOR: Automatically adds Token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('emhaToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// RESPONSE INTERCEPTOR: Global Error Handling (e.g. Auto-logout on 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('emhaToken');
            // window.location.href = '/'; // Optional: Auto-redirect to home on expiry
        }
        return Promise.reject(error);
    }
);

// 3. Export your endpoints using that BASE_URL
export const API_ENDPOINTS = {
    GET_PRODUCTS: `/product/get-all-products`,       // Since baseURL is set, you only need the path
    FEW_PRODUCTS: `/product/get-few-products`,
    TESTIMONIALS: `/general/testimonials`,
    CONTACT: `/contact`,
    LOGIN: `/users/login`,
    REGISTER: `/users/register`,

    // Admin Paths
    PENDING_USER: `/users/pending-users`,
    VALIDATE_USER: (id) => `/users/validate-user/${id}`,
    DELETE_USER: (id) => `/users/delete-user/${id}`,
    ADD_PRODUCT: '/product/add-product',
    UPDATE_PRODUCT: (id) => `/admin/update-product/${id}`,
    DELETE_PRODUCT: (id) => `/product/delete-product/${id}`,

    //Batch Managenent
    REGISTER_BATCH: `/trace/register-batch`,
    GET_BATCHES: `/trace/get-batches`,

    //client paths
    ADD_TIMELINE: (id) =>`/trace/add-timeline/${id}`,
    TRACE_PRODUCT: (getBatchParam)=> `/trace/${getBatchParam}`,
};

export default api;
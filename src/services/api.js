import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

api.interceptors.response.use(
    r => r,
    err => {
        console.log(err);
        return Promise.reject(err);
    }
);

export default api;
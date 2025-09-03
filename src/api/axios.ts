import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "https://tradelink-backend-6z6y.onrender.com",
=======
  baseURL: "https://tradelink-backend-6z6y.onrender.com/",
>>>>>>> 2e3a3a4c0ed12e2841244411c9b1031cb452df9a
  headers: { "Content-Type": "application/json" },
});

// Optional: attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

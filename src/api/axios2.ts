// src/api/servicesApi.ts
import axios, { type AxiosInstance } from "axios";

const axios2: AxiosInstance = axios.create({
  baseURL: "https://backend-dev-ltev.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
axios2.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios2;

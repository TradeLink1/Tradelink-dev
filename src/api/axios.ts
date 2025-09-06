import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://tradelink-be.onrender.com",
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

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/v1/auth/login", data);
  return res.data;
};

// UserProfile API Calls
export const getUserProfile = async () => {
  const res = await api.get("/api/v1/users/get/profile");
  return res.data;
};

export const updateUserProfile = async (data: any) => {
  const res = await api.put("/api/v1/users/profile/update", data);
  return res.data;
};

export const changeUserPassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const res = await api.put("/api/v1/users/change-password", data);
  return res.data;
};

export default api;

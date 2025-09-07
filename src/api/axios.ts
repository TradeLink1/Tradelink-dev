import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://tradelink-be.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Attach token if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/v1/auth/login", data);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/api/v1/users/get/profile");
  return res.data;
};

export const updateUserProfile = async (data: {
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
}) => {
  const res = await api.put("/api/v1/users/profile/update", data);
  return res.data;
};

export const changeUserPassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const res = await api.put("/api/v1/users/change-password", {
    oldPassword,
    newPassword,
  });
  return res.data;
};

export const deleteUserProfile = async () => {
  const res = await api.delete("/api/v1/users/delete/profile");
  return res.data;
};

export default api;

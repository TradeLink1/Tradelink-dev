"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Get token from URL query
    const params = new URLSearchParams(location.search);
    const t = params.get("token");
    if (!t) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "Reset token is missing",
      });
      navigate("/login");
    } else {
      setToken(t);
    }
  }, [location.search, navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });
    }

    if (!token) return;

    setLoading(true);
    try {
      await api.post("/api/v1/reset-password", {
        token,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "You can now log in with your new password",
      });

      navigate("/login");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to reset password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f89216]">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-8 rounded-2xl w-[400px] shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-[#F89216]"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mb-6">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-[#F89216]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#333333] text-white py-3 rounded-full hover:bg-[#30ac57] transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

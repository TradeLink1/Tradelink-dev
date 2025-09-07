"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";
import imageCompression from "browser-image-compression";

type UserSettingsData = {
  name: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const UserSettings: React.FC = () => {
  const [userData, setUserData] = useState<UserSettingsData>({
    name: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatarUrl: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(
          "https://tradelink-be.onrender.com/api/v1/users/get/profile"
        );
        const u = res.data.data;
        setUserData({
          name: u.name || "",
          fullName: u.fullName || "",
          email: u.email || "",
          phone: u.phone || "",
          address: u.address || "",
          avatarUrl: u.avatarUrl || u.logo || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err: any) {
        Swal.fire("Error", err.message || "Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      Swal.fire("Error", "Failed to process image", "error");
    }
  };

  const handleSaveProfile = async () => {
    if (!userData.name.trim() || !userData.email.trim()) {
      Swal.fire("Error", "Name and Email are required", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await api.put(
        "https://tradelink-be.onrender.com/api/v1/users/profile/update",
        {
          name: userData.name,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          avatarUrl: userData.avatarUrl,
        }
      );
      Swal.fire(
        "Success",
        res.data.message || "Profile updated successfully",
        "success"
      );
    } catch (err: any) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Update failed",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || e.target.files.length === 0) return;
  //   const file = e.target.files[0];

  //   try {
  //     const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setUserData((prev) => ({
  //         ...prev,
  //         avatarUrl: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(compressedFile);
  //   } catch (error) {
  //     Swal.fire("Error", "Failed to process image", "error");
  //   }
  // };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.newPassword !== userData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }
    try {
      const res = await api.put(
        "https://tradelink-be.onrender.com/api/v1/users/change-password",
        {
          oldPassword: userData.currentPassword,
          newPassword: userData.newPassword,
        }
      );
      Swal.fire(
        "Success",
        res.data.message || "Password changed successfully",
        "success"
      );
      setUserData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err: any) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to change password",
        "error"
      );
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    setIsDeleting(true);
    try {
      const res = await api.delete(
        "https://tradelink-be.onrender.com/api/v1/users/delete/profile"
      );
      Swal.fire(
        "Success",
        res.data.message || "Account deleted successfully",
        "success"
      );
      window.location.href = "/";
    } catch (err: any) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to delete account",
        "error"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading profile...</div>;

  return (
    <div className="p-8 space-y-10 min-h-screen">
      {/* Profile Card */}
      <div className="bg-[#ffb25417] border border-[#f8921672] p-6 rounded-2xl flex items-center gap-4">
        <div className="w-20 h-20 rounded-full border-2 border-[#f89216] overflow-hidden relative">
          {userData.avatarUrl ? (
            <img
              src={userData.avatarUrl}
              alt={userData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold bg-[#EC8E1C]">
              {userData.name.charAt(0)}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div>
          <p className="font-bold text-xl text-[#f89216]">{userData.name}</p>
          <p className="text-sm text-gray-600">{userData.fullName}</p>
          <p className="text-xs font-medium text-[#333] mt-1">
            {userData.email}
          </p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-[#333]">
          Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["fullName", "name", "email", "phone", "address"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-gray-800 capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={String(userData[field as keyof UserSettingsData])}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#EC8E1C] focus:border-[#EC8E1C]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="bg-[#30AC57] hover:bg-[#28994d] text-white font-medium px-6 py-2 rounded-full shadow transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Password Change */}
      <form
        onSubmit={handleChangePassword}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6"
      >
        <h3 className="text-lg font-semibold text-[#333]">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm font-medium text-gray-800 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="password"
                  name={field}
                  value={String(
                    userData[field as keyof UserSettingsData] || ""
                  )}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#EC8E1C] focus:border-[#EC8E1C]"
                />
              </div>
            )
          )}
        </div>
        <button
          type="submit"
          className="bg-[#f89216] hover:bg-[#333] text-white font-medium px-6 py-2 rounded-full shadow transition"
        >
          Change Password
        </button>
      </form>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-2xl border-2 border-red-500 shadow-sm">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm text-gray-600 mb-4">
          Deleting your account is irreversible.
        </p>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-full shadow transition disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default UserSettings;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "../../api/axios";
import imageCompression from "browser-image-compression";

type FormData = {
  name: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  language: string;
  marketingEmails: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  privacyPublic: boolean;
  newsletterSubscribed: boolean;
};

const UserSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    logo: "",
    language: "English",
    marketingEmails: true,
    smsNotifications: true,
    pushNotifications: false,
    privacyPublic: true,
    newsletterSubscribed: true,
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pictureLoading, setPictureLoading] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        const u = res.data;
        setFormData({
          name: u.name || "",
          fullName: u.fullName || "",
          email: u.email || "",
          phone: u.phone || "",
          address: u.address || "",
          logo: u.logo || "",
          language: u.language || "English",
          marketingEmails: u.marketingEmails ?? true,
          smsNotifications: u.smsNotifications ?? true,
          pushNotifications: u.pushNotifications ?? false,
          privacyPublic: u.privacyPublic ?? true,
          newsletterSubscribed: u.newsletterSubscribed ?? true,
        });
      } catch (err: any) {
        console.error("Fetch error:", err);
        Swal.fire(
          "Error",
          err.response?.data?.message ||
            err.message ||
            "Failed to load profile",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Type-safe input change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    let value: string | boolean;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  // Profile picture handler with compression
  const handleProfilePicChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5_000_000) {
        Swal.fire("Error", "Image size too large. Max 5MB.", "error");
        return;
      }
      setPictureLoading(true);
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, logo: reader.result as string });
          setPictureLoading(false);
        };
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        console.error("Image compression error:", err);
        setPictureLoading(false);
        Swal.fire("Error", "Failed to process image", "error");
      }
    }
  };

  // Save changes
  const handleSave = async () => {
    // Basic validations
    if (!formData.name.trim() || !formData.email.trim()) {
      Swal.fire("Error", "Name and Email are required", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Swal.fire("Error", "Please enter a valid email address", "error");
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile(formData);

      if (oldPassword && newPassword) {
        await changeUserPassword(oldPassword, newPassword);
        setOldPassword("");
        setNewPassword("");
      }

      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err: any) {
      console.error("Update error:", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || err.message || "Update failed",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading profile...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left Column: Main Account Info */}
      <div className="flex-1 bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#EC8E1C]">Account Settings</h2>

        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <img
            src={formData.logo || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <label className="cursor-pointer text-[#30AC57] hover:underline">
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Account Info Fields */}
        {["fullName", "name", "email", "phone", "address"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-medium text-gray-800 capitalize">
              {field}
            </label>
            {field === "address" ? (
              <textarea
                name={field}
                value={String(formData[field as keyof FormData])}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#EC8E1C] focus:border-[#EC8E1C]"
                rows={2}
              />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={String(formData[field as keyof FormData])}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#EC8E1C] focus:border-[#EC8E1C]"
                required={field === "name" || field === "email"}
              />
            )}
          </div>
        ))}

        {/* Password Fields */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-800">
            Old Password (optional)
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#EC8E1C] focus:border-[#EC8E1C]"
          />

          <label className="text-sm font-medium text-gray-800">
            New Password (optional)
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#EC8E1C] focus:border-[#EC8E1C]"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving || pictureLoading}
          className="bg-[#30AC57] text-white px-4 py-2 rounded-lg hover:bg-[#28994d] transition w-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Right Column: Preferences & Notifications */}
      <div className="w-full md:w-96 bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Preferences & Notifications
        </h3>

        <div className="flex items-center justify-between">
          <span>Email Updates</span>
          <input
            type="checkbox"
            name="marketingEmails"
            checked={formData.marketingEmails}
            onChange={handleChange}
            className="h-5 w-5 accent-[#30AC57]"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>SMS Notifications</span>
          <input
            type="checkbox"
            name="smsNotifications"
            checked={formData.smsNotifications}
            onChange={handleChange}
            className="h-5 w-5 accent-[#30AC57]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#EC8E1C] focus:border-[#EC8E1C]"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span>Push Notifications</span>
          <input
            type="checkbox"
            name="pushNotifications"
            checked={formData.pushNotifications}
            onChange={handleChange}
            className="h-5 w-5 accent-[#30AC57]"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Privacy: Public Profile</span>
          <input
            type="checkbox"
            name="privacyPublic"
            checked={formData.privacyPublic}
            onChange={handleChange}
            className="h-5 w-5 accent-[#30AC57]"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Subscribe to Newsletter</span>
          <input
            type="checkbox"
            name="newsletterSubscribed"
            checked={formData.newsletterSubscribed}
            onChange={handleChange}
            className="h-5 w-5 accent-[#30AC57]"
          />
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

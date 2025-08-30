import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Lock,
  Store,
  AlertTriangle,
  Upload,
} from "lucide-react";
import api from "../../api/axios";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "seller@example.com", // dummy
    phone: "",
    address: "",
    logo: null as File | null,
    description: "",
    businessCategory: "",
    notifications: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("api/v1/sellers/get/profile");
        const sellerData = res.data.seller;

        setFormData((prev) => ({
          ...prev,
          name: sellerData.storeName || "",
          email: sellerData.email || "",
          phone: sellerData.phone || "",
          description: sellerData.description || "",
          businessCategory: sellerData.businessCategory || "",
        }));
      } catch (err) {
        console.log("Error fetching seller profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  // UPDATED function with single request for profile + logo
  const handleSaveProfileStore = async (e: any) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append("storeName", formData.name);
      updateData.append("email", formData.email);
      updateData.append("phone", formData.phone);
      updateData.append("description", formData.description);
      updateData.append("businessCategory", formData.businessCategory);

      if (formData.logo) {
        updateData.append("logo", formData.logo);
      }

      // Log FormData entries for debugging
      for (let pair of updateData.entries()) {
        console.log("FormData:", pair[0], pair[1]);
      }

      const profileRes = await api.put("api/v1/sellers/edit/profile", updateData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token") }`
      }});

      console.log("Profile update response:", profileRes.data);
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error updating profile:", err.response?.data || err);
      alert(
        "Failed to update profile: " + (err.response?.data?.message || "")
      );
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await api.put("api/v1/auth/reset-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      alert("Password changed successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err: any) {
      console.error("Error changing password:", err);
      alert(err.response?.data?.message || "Failed to change password.");
    }
  };

  const handleDeactivate = () => {
    alert("Account deactivated (dummy). Backend will handle this later.");
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      alert("Account deleted (dummy). Backend will handle real delete.");
    }
  };

  return (
    <div className="p-8 min-h-screen space-y-10">
      {/* Page Heading */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="text-[#f89216]" size={32} />
        <h2 className="text-3xl font-bold text-[#333333]">Settings</h2>
      </div>

      {/* Store Preview */}
      <div className="bg-[#ffb25417] border border-[#f8921672] p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-[#333333]">
          Store Preview
        </h3>
        <div className="flex items-center gap-4">
          <div className="min-w-[80px] h-20 rounded-full border-2 border-[#f89216] flex items-center justify-center overflow-hidden">
            {formData.logo ? (
              <img
                src={URL.createObjectURL(formData.logo)}
                alt="Logo Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-xs">No Logo</span>
            )}
          </div>
          <div>
            <p className="font-bold text-xl text-[#f89216]">
              {formData.name || "Business Name"}
            </p>
            <p className="text-sm text-gray-600">
              {formData.description || "Store description will appear here..."}
            </p>
            <p className="text-xs font-medium text-[#333333] mt-1 uppercase">
              {formData.businessCategory || "No Category"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile & Store Settings */}
      <form
        onSubmit={handleSaveProfileStore}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-2">
          <Store className="text-[#f89216]" size={20} />
          <h3 className="text-lg font-semibold text-[#333333]">
            Profile & Store Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Business Name" name="name" onChange={handleChange} />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField label="Phone" name="phone" onChange={handleChange} />
          <InputField label="Address" name="address" onChange={handleChange} />
        </div>

        <div className="space-y-4">
          {/* Store Logo Upload */}
          <div>
            <label className="block font-medium mb-2 text-sm">Store Logo</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#f89216] transition">
              {formData.logo ? (
                <img
                  src={URL.createObjectURL(formData.logo)}
                  alt="Logo Preview"
                  className="w-24 h-24 object-cover rounded-full border border-gray-300 mb-3"
                />
              ) : (
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
              )}
              <p className="text-sm text-gray-600 mb-2">
                {formData.logo ? "Change Logo" : "Click to Upload Logo"}
              </p>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="logoUpload"
              />
              <label
                htmlFor="logoUpload"
                className="bg-[#f89216] text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-[#333333] transition"
              >
                {formData.logo ? "Replace Logo" : "Upload Store Logo"}
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-sm">Description</label>
            <textarea
              name="description"
              className="border p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#30ac57]"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>

          {/* Business Category */}
          <div>
            <label className="block font-medium mb-1 text-sm">
              Business Category
            </label>
            <select
              name="businessCategory"
              className="border p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#30ac57]"
              onChange={handleChange}
              value={formData.businessCategory}
            >
              <option value="">-- Select --</option>
              <option value="products">Products</option>
              <option value="services">Services</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-4 w-4 text-[#30ac57] focus:ring-[#30ac57] rounded"
            />
            <label className="font-medium text-sm">Enable Notifications</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#30ac57] hover:bg-[#333333] text-white font-medium px-6 py-2 rounded-full shadow transition"
        >
          Save Settings
        </button>
      </form>

      {/* Account Settings */}
      <form
        onSubmit={handleChangePassword}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-2">
          <Lock className="text-[#30ac57]" size={20} />
          <h3 className="text-lg font-semibold text-[#333333]">Account Settings</h3>
        </div>

        <div className="space-y-4">
          <InputField
            label="Current Password"
            name="currentPassword"
            type="password"
            onChange={handleChange}
            value={formData.currentPassword}
          />
          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            onChange={handleChange}
            value={formData.newPassword}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </div>

        <button
          type="submit"
          className="bg-[#f89216] hover:bg-[#333333] text-white font-medium px-6 py-2 rounded-full shadow transition"
        >
          Change Password
        </button>
      </form>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-2xl border-2 border-red-500 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-red-600" size={20} />
          <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Be careful! These actions cannot be undone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDeactivate}
            className="bg-gray-700 hover:bg-gray-900 text-white font-medium px-6 py-2 rounded-full shadow transition"
          >
            Deactivate Account
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-full shadow transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Small reusable input component
const InputField = ({ label, name, type = "text", value, onChange }: any) => (
  <div>
    <label className="block font-medium mb-1 text-sm">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#30ac57]"
    />
  </div>
);

export default Settings;

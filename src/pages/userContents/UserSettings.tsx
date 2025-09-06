import React, { useState } from "react";
// If you have a pre-configured axios instance (with baseURL/interceptors), use it:
import api from"../../api/axios"

const UserSettings: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // If your api instance already injects the token via interceptor, you can omit the headers below.
      let config: { headers: Record<string, string> } = {
        headers: { "Content-Type": "application/json" },
      };

      // Optional: attach token manually if not handled by interceptors
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await api.put(
        "/api/v1/users/profile/update",
        {
          name: fullName,
          email,
          phone,
          address,
          logo: profilePic, // send URL if your API expects a URL; base64 if your API accepts it
        },
        config
      );

      if (res.data?.success) {
        alert(res.data.message || "User profile updated successfully!");
        const u = res.data.data || {};
        setFullName(u.name || "");
        setEmail(u.email || "");
        setPhone(u.phone || "");
        setAddress(u.address || "");
        setProfilePic(u.logo || null);
      } else {
        console.error("API Error:", res.data);
        alert(res.data?.message || "Failed to update profile.");
      }
    } catch (err: any) {
      console.error("API Error:", err?.response?.data || err?.message || err);
      alert(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      <div className="flex items-center gap-4">
        <img
          src={profilePic || "https://via.placeholder.com/80"}
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

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Full Name</span>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Phone</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Address</span>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          rows={2}
        />
      </label>

      <button
        onClick={handleSave}
        disabled={loading}
        className={`bg-[#30AC57] text-white px-4 py-2 rounded transition mt-4 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#28994d]"}`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default UserSettings;

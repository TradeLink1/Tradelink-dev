import React, { useState } from "react";
import api from "../../api/axios"; // adjust path

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.put("api/v1/users/profile/update", {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });

      if (res.data.success) {
        setMessage(res.data.message);
      }
    } catch (error: any) {
      console.error("API error:", error.response || error.message);
      setMessage(
        error.response?.data?.message || "Something went wrong, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
            placeholder="Enter your address"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#30AC57] text-white px-4 py-2 rounded-lg hover:bg-[#28994d] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default EditProfile;

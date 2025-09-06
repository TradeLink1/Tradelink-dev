import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../api/axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const location = useLocation();
  const onProfileUpdate = location.state?.onProfileUpdate;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        const user = res.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
        });
      } catch (err: any) {
        Swal.fire("Error", "Failed to load user profile", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateUserProfile(formData);
      Swal.fire(
        "Success",
        res.message || "Profile updated successfully",
        "success"
      );
      onProfileUpdate && onProfileUpdate(res.data);
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

  if (loading)
    return <div className="text-center py-8">Loading profile...</div>;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {["name", "email", "phone", "address"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field === "name" ? "Full Name" : field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field as keyof FormData]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
              required={field === "name" || field === "email"}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="bg-[#30AC57] text-white px-4 py-2 rounded-lg hover:bg-[#28994d] transition w-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

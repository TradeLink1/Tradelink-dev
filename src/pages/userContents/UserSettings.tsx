import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getUserProfile, updateUserProfile } from "../../api/axios"; // Adjust the import path as necessary

const UserSettings: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile();
        const { avatarUrl, fullName, email, address } = response.data;
        setUser(response.data);
        setAvatarUrl(avatarUrl);
        setFullName(fullName);
        setEmail(email);
        setAddress(address);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile({ avatarUrl, fullName, email, address });
      Swal.fire({
        title: "Settings Saved",
        text: "Your settings have been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an issue saving your settings. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      <div className="flex items-center gap-4">
        <img
          src={avatarUrl || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <label className="cursor-pointer text-[#30AC57] hover:underline">
          Change Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setAvatarUrl(reader.result as string);
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Full Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <span className="text-sm text-gray-600">Default Delivery Address</span>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          rows={2}
        />
      </label>

      <button
        onClick={handleSave}
        className="bg-[#30AC57] text-white px-4 py-2 rounded hover:bg-[#28994d] transition mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserSettings;

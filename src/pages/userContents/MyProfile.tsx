import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
};

type MyProfileProps = {
  user: User | null;
};

const MyProfile: React.FC<MyProfileProps> = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center py-8">Loading user profile...</div>;
  }

  return (
    <div className="flex flex-col w-full space-y-6">
      <Header user={user} />

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Full Name</p>
            <p className="text-sm text-gray-500">{user.fullName || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Username</p>
            <p className="text-sm text-gray-500">{user.name || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p className="text-sm text-gray-500">{user.email || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-sm text-gray-500">{user.phone || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Address</p>
            <p className="text-sm text-gray-500">{user.address || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Logo</p>
            {user.logo ? (
              <img
                src={user.logo}
                alt="User Logo"
                className="w-20 h-20 object-contain rounded-md border"
              />
            ) : (
              <p className="text-sm text-gray-500">No logo uploaded</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="bg-[#EC8E1C] hover:bg-[#d67a15] text-white rounded-lg px-6 py-2"
            onClick={() => navigate("/userProfile/settings")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

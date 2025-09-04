import React from "react";
import Header from "../../pages/userContents/Header";

const UserProfile: React.FC = () => {
  const user = {
    id: "1",
    name: "Fadipe Omotayo",
    email: "fadipeomotayo@gmail.com",
    phone: "08123456789",
    location: "Lagos, Nigeria",
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white shadow px-6 py-4">
        <Header user={user} />
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Account Details
            </h3>
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-medium">Location:</span> {user.location}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Quick Actions
            </h3>
            <button className="w-full bg-[#30AC57] text-white px-4 py-2 rounded-lg hover:bg-[#28994d] transition">
              Edit Profile
            </button>
            <button className="w-full mt-3 bg-[#EC8E1C] text-white px-4 py-2 rounded-lg hover:bg-[#d87b17] transition">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

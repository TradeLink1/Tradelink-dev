import React from "react";

const EditProfile = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

      <form className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#30AC57] focus:border-[#30AC57]"
            placeholder="Enter your phone number"
          />
        </div>

        <button
          type="submit"
          className="bg-[#30AC57] text-white px-4 py-2 rounded-lg hover:bg-[#28994d] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

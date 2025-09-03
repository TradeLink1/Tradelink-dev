// src/components/UserProfile/UserProfile.tsx
import React from "react";

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onMessageClick?: () => void; // callback when "Message Seller" is clicked
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatarUrl,
  onMessageClick,
}) => {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg shadow-md bg-white max-w-md">
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-700">
          {name[0].toUpperCase()}
        </div>
      )}

      {/* Seller Info */}
      <div className="flex-1">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* Message Button */}
      <button
        onClick={onMessageClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Message Seller
      </button>
    </div>
  );
};

export default UserProfile;
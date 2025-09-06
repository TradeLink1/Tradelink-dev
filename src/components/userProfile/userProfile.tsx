import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { getUserProfile } from "../../api/axios";
import Header from "../../pages/userContents/Header";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">No profile data available.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-4">
          <img
            src={user.logo || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <h2 className="text-2xl font-semibold">{user.fullName}</h2>
          <p className="text-gray-600">{user.email}</p>

          <div className="mt-6 w-full space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-gray-500" />
              <span>{user.fullName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" />
              <span>{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="text-gray-500" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-500" />
                <span>{user.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

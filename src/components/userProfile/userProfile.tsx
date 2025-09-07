import React, { useState, useEffect } from "react";
import { getUserProfile } from "../../api/axios";
import MyProfile from "../../pages/userContents/MyProfile";

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

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!user)
    return <div className="p-6 text-center">No profile data available.</div>;

  return <MyProfile user={user} />;
};

export default UserProfile;

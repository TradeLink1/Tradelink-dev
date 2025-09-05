import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { getUserProfile } from "../../api/axios";
import Header from "../../pages/userContents/Header";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData.data);
      } catch (err: any) {
        console.log(err, err.response.status, err.response.data);
        setError("Failed to load user profile.${err.response.data.message}");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data available</div>;
  const firstLetter = user.name.charAt(0).toUpperCase();

  const formattedName = user.name
    .split(" ")
    .map((n: string) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(" ");

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white shadow px-6 py-4">
        <Header user={user} firstLetter={firstLetter} />
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, <span className="text-[#30AC57]">{formattedName}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b pb-3">
              Account Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5 text-[#30AC57]" />
                <p>
                  <span className="font-medium">Name:</span> {formattedName}
                </p>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-[#30AC57]" />
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-[#30AC57]" />
                <p>
                  <span className="font-medium">Phone:</span> {user.phone}
                </p>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-[#30AC57]" />
                <p>
                  <span className="font-medium">Location:</span> {user.address}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b pb-3">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-[#30AC57] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-[#28994d] transition transform hover:scale-[1.02]">
                Edit Profile
              </button>
              <button className="w-full bg-[#EC8E1C] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-[#d87b17] transition transform hover:scale-[1.02]">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

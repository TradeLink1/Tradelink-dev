import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import { getUserProfile } from "../../api/axios";

const UserLayout: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserProfile();
      setUser(res.data);
    };
    fetchUser();
  }, []);

  if (!user) return <div className="text-center py-8">Loading user...</div>;

  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto p-4">
        <Outlet context={{ user, setUser }} />
      </div>
    </div>
  );
};

export default UserLayout;

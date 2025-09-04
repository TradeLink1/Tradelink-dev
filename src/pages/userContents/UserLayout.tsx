import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const UserLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r shadow-sm">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

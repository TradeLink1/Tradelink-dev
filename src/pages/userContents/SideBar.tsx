import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdMessage,
  MdDashboard,
  MdSettings,
  MdLogout,
  MdHome,
} from "react-icons/md";
import Swal from "sweetalert2";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleMessagesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading messages...",
      text: "Please wait while we fetch your conversations",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      Swal.close();
      navigate("/userProfile/messages");
    }, 1500);
  };

  const menuLinks = [
    {
      path: "/",
      label: "Back to Home",
      icon: <MdHome size={20} />,
    },
    {
      path: "/userProfile",
      label: "My Profile",
      icon: <MdDashboard size={20} />,
    },
    {
      path: "/userProfile/messages",
      label: "Messages",
      icon: <MdMessage size={20} />,
      onClick: handleMessagesClick,
    },
    {
      path: "/userProfile/settings",
      label: "Settings",
      icon: <MdSettings size={20} />,
    },
    {
      path: "/logout",
      label: "Logout",
      icon: <MdLogout size={20} />,
    },
  ];

  return (
    <nav className="bg-[#F8F9FA] p-4 h-full flex flex-col justify-between">
      <ul className="space-y-4">
        {menuLinks.map((link) => (
          <li key={link.path}>
            {link.onClick ? (
              <a
                href={link.path}
                onClick={link.onClick}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-[#30AC57] transition"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                    isActive ? "text-[#30AC57] font-semibold" : "text-gray-700"
                  } hover:text-[#30AC57]`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

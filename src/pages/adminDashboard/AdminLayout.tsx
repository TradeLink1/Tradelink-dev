import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiCheckCircle,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    closeSidebar();
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const navItems = [
    { name: "Overview", path: "/admin", icon: <FiHome size={18} /> },
    { name: "Sellers", path: "/admin/sellers", icon: <FiUsers size={18} /> },
    {
      name: "KYC Verification",
      path: "/admin/kyc",
      icon: <FiCheckCircle size={18} />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FiBarChart2 size={18} />,
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Sidebar */}
      <aside
        className={`
          bg-[#1e1e1e] p-8
          w-72 transition-transform duration-300 ease-in-out
          md:translate-x-0 h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          fixed md:relative left-0 z-40
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-600 mb-6 pb-4">
          <h2 className="text-xl font-bold text-[#f89216]">
            Admin <span className="text-white font-medium">Dashboard</span>
          </h2>
          <button
            className="md:hidden p-1 rounded-md cursor-pointer bg-[#f89216]"
            onClick={toggleSidebar}
          >
            <IoClose size={24} color="white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-[#f89216] text-white shadow-md"
                    : "text-gray-200 hover:bg-gray-100 hover:text-[#1e1e1e]"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-10">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full justify-center text-white px-6 py-3 rounded-full text-[16px] border border-[#f89216] font-semibold hover:bg-[#f89216] hover:text-white transition-all duration-200"
          >
            <FiLogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        {/* Mobile Menu Button */}
        <div className="md:hidden p-4">
          {!isOpen && (
            <button
              className="p-2 rounded-md shadow-md bg-[#f89216] cursor-pointer"
              onClick={toggleSidebar}
            >
              <FiMenu size={24} color="white" />
            </button>
          )}
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

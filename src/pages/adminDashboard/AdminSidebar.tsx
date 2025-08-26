import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

type Props = {
  open: boolean;
  onClose: () => void;
};

const linkBase =
  "block px-4 py-2 rounded hover:bg-orange-50 hover:text-orange-600";
const linkActive = "bg-orange-100 text-orange-700 font-semibold";

const AdminSidebar = ({ open, onClose }: Props) => {
  return (
    <>
      {/* overlay for mobile */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
        />
      )}

      <aside
        className={`sticky min-h-screen top-0 left-0 pt-30 z-30 w-64 h-screen bg-white border-r shadow-2xl transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]`}
      >
        {/* close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="font-semibold text-gray-800">Admin Menu</h2>
          <button onClick={onClose}>
            <FaTimes className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 space-y-1 text-gray-700">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
            onClick={onClose}
          >
            Overview
          </NavLink>

          <div className="mt-2 border-b" />

          <NavLink
            to="/admin/sellers"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
            onClick={onClose}
          >
            Sellers
          </NavLink>

          <NavLink
            to="/admin/kyc"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
            onClick={onClose}
          >
            KYC Queue
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
            onClick={onClose}
          >
            Reports
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;

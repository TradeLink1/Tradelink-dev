import { useMemo } from "react";
import {
  FiUsers,
  FiCheckCircle,
  FiBox,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";

const AdminOverview = () => {
  // Dummy stats (replace with API later)
  const stats = useMemo(
    () => ({
      totalSellers: 128,
      pendingKyc: 7,
      activeListings: 842,
      flaggedReports: 3,
    }),
    []
  );

  const activities = [
    { id: 1, text: "Approved KYC for Rose Kitchen Equipment", time: "2h ago" },
    {
      id: 2,
      text: "Suspended seller: Dan’s Autos (fraudulent listing)",
      time: "5h ago",
    },
    {
      id: 3,
      text: "New listing: Ada Fashion House - ‘Ankara set’",
      time: "Yesterday",
    },
  ];

  const statCards = [
    {
      title: "Total Sellers",
      value: stats.totalSellers,
      color: "from-orange-400 to-orange-600",
      icon: <FiUsers size={28} />,
    },
    {
      title: "Pending KYC",
      value: stats.pendingKyc,
      color: "from-yellow-400 to-yellow-600",
      icon: <FiCheckCircle size={28} />,
    },
    {
      title: "Active Listings",
      value: stats.activeListings,
      color: "from-green-400 to-green-600",
      icon: <FiBox size={28} />,
    },
    {
      title: "Flagged Reports",
      value: stats.flaggedReports,
      color: "from-red-400 to-red-600",
      icon: <FiAlertTriangle size={28} />,
    },
  ];

  return (
    <div className="space-y-8 pt-5 w-full">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.color} rounded-xl shadow-lg p-6 text-white flex flex-col gap-3 transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{card.title}</span>
              <div className="bg-white/20 p-2 rounded-lg">{card.icon}</div>
            </div>
            <div className="text-4xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full">
        <h2 className="font-semibold text-lg text-gray-800 mb-4">
          Latest Activity
        </h2>
        <ul className="space-y-4">
          {activities.map((a) => (
            <li
              key={a.id}
              className="flex items-start gap-4 border-b border-gray-100 last:border-none pb-4"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f89216]/20 text-[#f89216]">
                <FiClock size={16} />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 font-medium">{a.text}</p>
                <span className="text-xs text-gray-500">{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;

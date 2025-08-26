import { useMemo } from "react";

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
    { id: 2, text: "Suspended seller: Dan’s Autos (fraudulent listing)", time: "5h ago" },
    { id: 3, text: "New listing: Ada Fashion House - ‘Ankara set’", time: "Yesterday" },
  ];

  return (
    <div className="space-y-6 pt-5 w-full">
      <h1 className="text-2xl font-bold text-gray-800">Overview</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <div className="bg-white rounded shadow p-6 border-b-4 border-orange-400 flex flex-col justify-between">
          <div className="text-gray-500 text-sm">Total Sellers</div>
          <div className="text-3xl font-bold">{stats.totalSellers}</div>
        </div>
        <div className="bg-white rounded shadow p-6 border-b-4 border-yellow-400 flex flex-col justify-between">
          <div className="text-gray-500 text-sm">Pending KYC</div>
          <div className="text-3xl font-bold">{stats.pendingKyc}</div>
        </div>
        <div className="bg-white rounded shadow p-6 border-b-4 border-green-500 flex flex-col justify-between">
          <div className="text-gray-500 text-sm">Active Listings</div>
          <div className="text-3xl font-bold">{stats.activeListings}</div>
        </div>
        <div className="bg-white rounded shadow p-6 border-b-4 border-red-500 flex flex-col justify-between">
          <div className="text-gray-500 text-sm">Flagged Reports</div>
          <div className="text-3xl font-bold">{stats.flaggedReports}</div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="bg-white rounded shadow p-6 w-full">
        <h2 className="font-semibold mb-3">Latest Activity</h2>
        <ul className="space-y-2">
          {activities.map((a) => (
            <li key={a.id} className="flex items-center justify-between border-b last:border-none pb-2">
              <span className="text-gray-700">{a.text}</span>
              <span className="text-xs text-gray-500">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;

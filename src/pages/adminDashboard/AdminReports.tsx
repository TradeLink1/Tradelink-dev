import React, { useState } from "react";
import {
  Store,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface SellerReport {
  id: number;
  sellerName: string;
  businessName: string;
  totalSales: number;
  flaggedIssues: number;
  status: "Active" | "Inactive" | "Suspended";
}

const AdminSellersReport: React.FC = () => {
  const initialReports: SellerReport[] = [
    {
      id: 1,
      sellerName: "Rose Johnson",
      businessName: "Rose Kitchen Equipment",
      totalSales: 120,
      flaggedIssues: 1,
      status: "Active",
    },
    {
      id: 2,
      sellerName: "John Doe",
      businessName: "John's Electronics",
      totalSales: 85,
      flaggedIssues: 0,
      status: "Inactive",
    },
    {
      id: 3,
      sellerName: "Mary Smith",
      businessName: "Mary's Fashion",
      totalSales: 210,
      flaggedIssues: 3,
      status: "Suspended",
    },
    {
      id: 4,
      sellerName: "Samuel Olumide",
      businessName: "Samuel Groceries",
      totalSales: 60,
      flaggedIssues: 2,
      status: "Active",
    },
  ];

  const [reports, setReports] = useState<SellerReport[]>(initialReports);
  const [filter, setFilter] = useState<
    "All" | "Active" | "Inactive" | "Suspended"
  >("All");

  const statusColors: Record<SellerReport["status"], string> = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-700",
    Suspended: "bg-red-100 text-red-700",
  };

  const statusIcons: Record<SellerReport["status"], React.ReactNode> = {
    Active: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
    Inactive: <XCircle className="w-4 h-4 mr-1 text-gray-600" />,
    Suspended: <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />,
  };

  const suspendSeller = (id: number) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Suspended" } : r))
    );
  };

  const filteredReports = reports.filter(
    (r) => filter === "All" || r.status === filter
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Sellers Report</h2>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as "All" | "Active" | "Inactive" | "Suspended"
            )
          }
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white border rounded-xl p-5 shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center">
                <Store className="w-5 h-5 mr-2 text-indigo-500" />
                {report.sellerName}
              </h3>

              <span
                className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[report.status]
                }`}
              >
                {statusIcons[report.status]}
                {report.status}
              </span>
            </div>

            <p className="text-gray-700 font-medium mb-2">
              {report.businessName}
            </p>

            <div className="mt-3 space-y-2 text-sm">
              <p className="flex items-center text-gray-600">
                <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                <span>Total Sales:</span>
                <span className="ml-2 font-semibold">{report.totalSales}</span>
              </p>
              <p className="flex items-center text-gray-600">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                <span>Flagged Issues:</span>
                <span className="ml-2 font-semibold">
                  {report.flaggedIssues}
                </span>
              </p>
            </div>

            {report.status !== "Suspended" && (
              <button
                onClick={() => suspendSeller(report.id)}
                className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Suspend Seller
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSellersReport;

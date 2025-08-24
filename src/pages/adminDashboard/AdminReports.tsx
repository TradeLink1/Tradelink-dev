import { useState } from "react";

interface SellerReport {
  id: number;
  sellerName: string;
  businessName: string;
  totalSales: number;
  flaggedIssues: number;
  status: "Active" | "Inactive" | "Suspended";
}

const AdminSellersReport = () => {
  const [reports, setReports] = useState<SellerReport[]>([
    { id: 1, sellerName: "Rose Johnson", businessName: "Rose Kitchen Equipment", totalSales: 120, flaggedIssues: 1, status: "Active" },
    { id: 2, sellerName: "John Doe", businessName: "John's Electronics", totalSales: 85, flaggedIssues: 0, status: "Inactive" },
    { id: 3, sellerName: "Mary Smith", businessName: "Mary's Fashion", totalSales: 210, flaggedIssues: 3, status: "Suspended" },
    { id: 4, sellerName: "Samuel Olumide", businessName: "Samuel Groceries", totalSales: 60, flaggedIssues: 2, status: "Active" },
  ]);

  const statusColors = {
    Active: "bg-green-200 text-green-800",
    Inactive: "bg-gray-200 text-gray-800",
    Suspended: "bg-red-200 text-red-800",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Sellers Report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{report.sellerName}</h3>
            <p className="text-gray-700 mt-1 font-medium">{report.businessName}</p>
            <div className="mt-2">
              <p>Total Sales: <span className="font-semibold">{report.totalSales}</span></p>
              <p>Flagged Issues: <span className="font-semibold">{report.flaggedIssues}</span></p>
            </div>
            <span
              className={`inline-block px-2 py-1 mt-2 rounded-full text-sm font-medium ${statusColors[report.status]}`}
            >
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSellersReport;

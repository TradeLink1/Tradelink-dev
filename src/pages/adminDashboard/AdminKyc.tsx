import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Mail, User } from "lucide-react";

interface KycRequest {
  id: number;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AdminKyc = () => {
  const [kycRequests, setKycRequests] = useState<KycRequest[]>([
    {
      id: 1,
      name: "Rose Kitchen Equipment",
      email: "rose@example.com",
      status: "Pending",
    },
    { id: 2, name: "John Doe", email: "john@example.com", status: "Approved" },
    {
      id: 3,
      name: "Mary Smith",
      email: "mary@example.com",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Samuel Olumide",
      email: "samuel@example.com",
      status: "Pending",
    },
  ]);

  const handleApprove = (id: number) => {
    setKycRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );
  };

  const handleReject = (id: number) => {
    setKycRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
  };

  const statusColors: Record<KycRequest["status"], string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  const statusIcons: Record<KycRequest["status"], React.ReactNode> = {
    Pending: <Clock className="w-4 h-4 mr-1 text-yellow-600" />,
    Approved: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
    Rejected: <XCircle className="w-4 h-4 mr-1 text-red-600" />,
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">KYC Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kycRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                {req.name}
              </h3>
              <span
                className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[req.status]
                }`}
              >
                {statusIcons[req.status]}
                {req.status}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center text-gray-600 mt-2 text-sm">
              <Mail className="w-4 h-4 mr-2" />
              {req.email}
            </div>

            {/* Actions */}
            {req.status === "Pending" && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminKyc;

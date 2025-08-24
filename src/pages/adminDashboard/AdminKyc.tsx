import { useState } from "react";

interface KycRequest {
  id: number;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AdminKyc = () => {
  const [kycRequests, setKycRequests] = useState<KycRequest[]>([
    { id: 1, name: "Rose Kitchen Equipment", email: "rose@example.com", status: "Pending" },
    { id: 2, name: "John Doe", email: "john@example.com", status: "Approved" },
    { id: 3, name: "Mary Smith", email: "mary@example.com", status: "Rejected" },
    { id: 4, name: "Samuel Olumide", email: "samuel@example.com", status: "Pending" },
  ]);

  const handleApprove = (id: number) => {
    setKycRequests(
      kycRequests.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleReject = (id: number) => {
    setKycRequests(
      kycRequests.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Approved: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">KYC Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kycRequests.map((req) => (
          <div key={req.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{req.name}</h3>
            <p className="text-gray-600">{req.email}</p>
            <span
              className={`inline-block px-2 py-1 mt-2 rounded-full text-sm font-medium ${statusColors[req.status]}`}
            >
              {req.status}
            </span>
            {req.status === "Pending" && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

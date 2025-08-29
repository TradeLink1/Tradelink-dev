import React, { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Mail, Store } from "lucide-react";

interface Seller {
  id: number;
  name: string;
  email: string;
  businessName: string;
  status: "Active" | "Inactive" | "Suspended";
}

const AdminSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([
    {
      id: 1,
      name: "Rose Johnson",
      email: "rose@sellers.com",
      businessName: "Rose Kitchen Equipment",
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@sellers.com",
      businessName: "John's Electronics",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mary Smith",
      email: "mary@sellers.com",
      businessName: "Mary's Fashion",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Samuel Olumide",
      email: "samuel@sellers.com",
      businessName: "Samuel Groceries",
      status: "Active",
    },
  ]);

  const handleActivate = (id: number) => {
    setSellers((prev) =>
      prev.map((seller) =>
        seller.id === id ? { ...seller, status: "Active" } : seller
      )
    );
  };

  const handleSuspend = (id: number) => {
    setSellers((prev) =>
      prev.map((seller) =>
        seller.id === id ? { ...seller, status: "Suspended" } : seller
      )
    );
  };

  const statusColors: Record<Seller["status"], string> = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
    Suspended: "bg-red-100 text-red-800",
  };

  const statusIcons: Record<Seller["status"], React.ReactNode> = {
    Active: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
    Inactive: <AlertTriangle className="w-4 h-4 mr-1 text-gray-600" />,
    Suspended: <XCircle className="w-4 h-4 mr-1 text-red-600" />,
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div
            key={seller.id}
            className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            {/* Header with name + status */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{seller.name}</h3>
              <span
                className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[seller.status]
                }`}
              >
                {statusIcons[seller.status]}
                {seller.status}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center text-gray-600 mt-2 text-sm">
              <Mail className="w-4 h-4 mr-2" />
              {seller.email}
            </div>

            {/* Business name */}
            <div className="flex items-center text-gray-800 mt-2 font-medium">
              <Store className="w-4 h-4 mr-2" />
              {seller.businessName}
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              {seller.status !== "Active" && (
                <button
                  onClick={() => handleActivate(seller.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                >
                  Activate
                </button>
              )}
              {seller.status !== "Suspended" && (
                <button
                  onClick={() => handleSuspend(seller.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                >
                  Suspend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSellers;

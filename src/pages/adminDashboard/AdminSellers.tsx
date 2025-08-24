import { useState } from "react";

interface Seller {
  id: number;
  name: string;
  email: string;
  businessName: string;
  status: "Active" | "Inactive" | "Suspended";
}

const AdminSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([
    { id: 1, name: "Rose Johnson", email: "rose@sellers.com", businessName: "Rose Kitchen Equipment", status: "Active" },
    { id: 2, name: "John Doe", email: "john@sellers.com", businessName: "John's Electronics", status: "Inactive" },
    { id: 3, name: "Mary Smith", email: "mary@sellers.com", businessName: "Mary's Fashion", status: "Suspended" },
    { id: 4, name: "Samuel Olumide", email: "samuel@sellers.com", businessName: "Samuel Groceries", status: "Active" },
  ]);

  const handleActivate = (id: number) => {
    setSellers(
      sellers.map((seller) =>
        seller.id === id ? { ...seller, status: "Active" } : seller
      )
    );
  };

  const handleSuspend = (id: number) => {
    setSellers(
      sellers.map((seller) =>
        seller.id === id ? { ...seller, status: "Suspended" } : seller
      )
    );
  };

  const statusColors = {
    Active: "bg-green-200 text-green-800",
    Inactive: "bg-gray-200 text-gray-800",
    Suspended: "bg-red-200 text-red-800",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div key={seller.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{seller.name}</h3>
            <p className="text-gray-600">{seller.email}</p>
            <p className="text-gray-700 mt-1 font-medium">{seller.businessName}</p>
            <span
              className={`inline-block px-2 py-1 mt-2 rounded-full text-sm font-medium ${statusColors[seller.status]}`}
            >
              {seller.status}
            </span>
            <div className="mt-4 flex gap-2">
              {seller.status !== "Active" && (
                <button
                  onClick={() => handleActivate(seller.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Activate
                </button>
              )}
              {seller.status !== "Suspended" && (
                <button
                  onClick={() => handleSuspend(seller.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

import React from "react";
import { CheckCircle, Mail, Phone, MapPin, Briefcase, ArrowLeft } from "lucide-react";
import Button from "../../components/reusable/Button";
import { useNavigate } from "react-router-dom";

const dummySeller = {
  _id: "68b4a5db6a318979887c779c",
  storeName: "Adamzy Autos",
  email: "adamzy@example.com",
  phone: "07035681278",
  location: {
    address: "Abuja, Nigeria",
    city: "Abuja",
    state: "FCT",
  },
  verified: true,
  createdAt: "2024-11-15T10:30:00Z",
  description: "Trusted car dealer with over 10 years of experience",
  products: [
    {
      _id: "68add65b98b34764e4ad9fa7",
      name: "Wireless Headphones",
      price: 150,
      category: "Electronics & Gadgets",
      quantity: 50,
      description: "This is new",
      productImg: "https://via.placeholder.com/300x200?text=Headphones",
      createdAt: "2025-08-26T15:44:27.461Z",
    },
    {
      _id: "68b6cff2c9dd670d20dfc45f",
      name: "Groundnut",
      price: 200,
      category: "Groceries & Essentials",
      quantity: 2,
      description: "Freshly roasted groundnut",
      productImg: "https://via.placeholder.com/300x200?text=Groundnut",
      createdAt: "2025-09-02T11:07:30.289Z",
    },
  ],
};

const SellerProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Back Button */}
      <Button
        className="flex items-center gap-2 mb-6 bg-gray-100 hover:bg-gray-200"
        onClick={() => navigate("/products")}
      >
        <ArrowLeft size={16} />
        Back to Products
      </Button>

      {/* Seller Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-orange-600 flex items-center gap-2">
            {dummySeller.storeName}
            {dummySeller.verified && (
              <CheckCircle className="text-green-500" size={20} />
            )}
          </h2>
          <span className="text-sm text-gray-500">
            Since {new Date(dummySeller.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="mt-3 text-gray-700">{dummySeller.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-orange-500" />
            {dummySeller.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-orange-500" />
            {dummySeller.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-orange-500" />
            {dummySeller.location.address}, {dummySeller.location.state}
          </div>
        </div>
      </div>

      {/* Seller Products */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Briefcase size={18} className="text-orange-500" />
        Products by {dummySeller.storeName}
      </h3>

      {dummySeller.products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummySeller.products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative">
                <img
                  src={p.productImg}
                  alt={p.name}
                  className="h-48 w-full object-cover rounded mb-3"
                />
              </div>

              <h4 className="font-semibold text-base text-orange-600">
                {p.name}
              </h4>
              <p className="text-sm text-gray-700 line-clamp-2">{p.description}</p>
              <p className="text-xs text-gray-500 mt-1">📂 {p.category}</p>
              <p className="text-sm font-medium text-gray-900 mt-2">
                ₦{p.price.toLocaleString()}
              </p>

              <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-sm py-2">
                View Product
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
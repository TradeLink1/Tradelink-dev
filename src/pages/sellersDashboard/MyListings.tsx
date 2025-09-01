import { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import api from "../../api/axios"; // ✅ your axios instance

interface Listing {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock?: number | null;
  image: string;
}

const MyListings = () => {
  const [activeTab, setActiveTab] = useState<"products" | "services">("products");
  const [products, setProducts] = useState<Listing[]>([]);
  const [services, setServices] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const sellerId = localStorage.getItem("sellerId"); // ✅ must be set at login

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (!sellerId) return;

        // fetch products
        const productRes = await api.get(`/api/v1/products/seller/${sellerId}`);
        setProducts(productRes.data?.data || []);

        // fetch services
        const serviceRes = await api.get(`/api/v1/services/seller/${sellerId}`);
        setServices(serviceRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [sellerId]);

  const handleDelete = async (id: string, type: "products" | "services") => {
    try {
      await api.delete(`/api/v1/${type}/${id}`);
      if (type === "products") {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        setServices(services.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(`Failed to delete ${type}:`, err);
    }
  };

  const renderItems = (items: Listing[], type: "products" | "services") => {
    if (loading) return <p>Loading {type}...</p>;
    if (items.length === 0) return <p>No {type} uploaded yet.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-[30px] shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#333333]">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>

              {item.price && (
                <p className="text-[#30ac57] font-bold mt-2">
                  ₦{item.price.toLocaleString()}
                </p>
              )}
              {item.stock !== null && item.stock !== undefined && (
                <p className="text-sm text-gray-600 mt-1">Stock: {item.stock}</p>
              )}

              <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-1 bg-[#F89216] hover:bg-[#30ac57] text-white px-4 py-2 rounded-full text-sm transition cursor-pointer">
                  <FiEdit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, type)}
                  className="flex items-center gap-1 bg-[#333333] hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition cursor-pointer"
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen max-w-[1200px] mx-auto">
      <h2 className="text-3xl text-[#333333] font-bold mb-8">My Listings</h2>

      {/* Tab Switcher */}
      <div className="relative flex w-80 mb-8 bg-[#f892163d] rounded-full p-1">
        <motion.div
          layout
          className="absolute top-1 bottom-1 w-1/2 bg-[#F89216] rounded-full"
          initial={false}
          animate={{ x: activeTab === "products" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        <button
          onClick={() => setActiveTab("products")}
          className={`relative z-10 flex-1 text-center font-medium py-2 transition-colors ${
            activeTab === "products" ? "text-white" : "text-[#333333]"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`relative z-10 flex-1 text-center font-medium py-2 transition-colors ${
            activeTab === "services" ? "text-white" : "text-[#333333]"
          }`}
        >
          Services
        </button>
      </div>

      {activeTab === "products"
        ? renderItems(products, "products")
        : renderItems(services, "services")}
    </div>
  );
};

export default MyListings;

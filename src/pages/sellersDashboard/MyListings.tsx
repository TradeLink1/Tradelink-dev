import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion"; // 👈 add this
import tomatoes from "../../assets/images/listing-images/tomatoes.jpg";
import shoes from "../../assets/images/listing-images/shoes.jpg";
import airpods from "../../assets/images/listing-images/airpods.jpg";
import braids from "../../assets/images/listing-images/braids.jpg";
import blazzers from "../../assets/images/listing-images/blazzer.jpg";
import cake from "../../assets/images/listing-images/cake.jpg";

const MyListings = () => {
  const [activeTab, setActiveTab] = useState<"products" | "services">(
    "products"
  );

  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Local & Perishables",
      price: 2500,
      stock: 20,
      image: tomatoes,
    },
    {
      id: 2,
      name: "Men’s Sneakers",
      category: "Clothing & Fashion",
      price: 18000,
      stock: 10,
      image: shoes,
    },
    {
      id: 4,
      name: "Airpods",
      category: "Electronics & Gadgets",
      price: 25000,
      stock: 12,
      image: airpods,
    },
  ];

  const services = [
    {
      id: 1,
      name: "Beautiful Braids",
      category: "Hair Styling",
      price: 7000,
      stock: null,
      image: braids,
    },
    {
      id: 2,
      name: "Blazzer's",
      category: "Fashion Design",
      price: 10000,
      stock: null,
      image: blazzers,
    },
    {
      id: 3,
      name: "Bridal Cake",
      category: "Catering",
      price: 50000,
      stock: null,
      image: cake,
    },
  ];

  const handleDelete = (id: number, type: string) => {
    if (type === "products") {
      alert(`Deleted product with id: ${id}`);
    } else {
      alert(`Deleted service with id: ${id}`);
    }
  };

  const renderItems = (items: any[], type: string) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-[#ffffff] rounded-[30px] shadow-md hover:shadow-xl transition overflow-hidden"
        >
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover transform hover:scale-105 transition duration-300"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-[#333333]">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">{item.category}</p>

            {item.price && (
              <p className="text-[#30ac57] font-bold mt-2">
                ₦{item.price.toLocaleString()}
              </p>
            )}
            {item.stock !== null && (
              <p className="text-sm text-gray-600 mt-1">Stock: {item.stock}</p>
            )}

            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-1 bg-[#F89216] hover:bg-[#30ac57] text-white px-4 py-2 rounded-full text-sm transition cursor-pointer">
                <FiEdit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(item.id, type)}
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

  return (
    <div className="p-6 min-h-screen max-w-[1200px] mx-auto">
      <h2 className="text-3xl text-[#333333] font-bold mb-8">My Listings</h2>

      {/*  Tab Switcher */}
      <div className="relative flex w-80 mb-8 bg-[#f892163d] rounded-full p-1">
        {/* slider */}
        <motion.div
          layout
          className="absolute top-1 bottom-1 w-1/2 bg-[#F89216] rounded-full"
          initial={false}
          animate={{
            x: activeTab === "products" ? 0 : "100%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* Buttons */}
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

      {/* Listings */}
      {activeTab === "products"
        ? renderItems(products, "products")
        : renderItems(services, "services")}
    </div>
  );
};

export default MyListings;

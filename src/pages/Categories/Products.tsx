import React, { useState, useEffect } from "react";
import {   Briefcase } from "lucide-react";
//  search MapPin
import Button from "../../components/reusable/Button";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Products: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState("All Categories");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  // ✅ Fetch products from API
  useEffect(() => {
    api
      .get("/api/v1/products")
      .then((res) => {
        // Handle both array response and { products: [...] }
        const data = Array.isArray(res.data) ? res.data : res.data.products;

        setProducts(data || []);
        setFilteredProducts(data || []);
        console.log("Fetched products:", data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Auto filter when query/category/location changes
  useEffect(() => {
    const filtered = products.filter((p) => {
      const matchesQuery =
        query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        p.category.toLowerCase() === category.toLowerCase();

      const matchesLocation =
        location === "All Locations" ||
        (p.location && p.location.toLowerCase() === location.toLowerCase());

      return matchesQuery && matchesCategory && matchesLocation;
    });

    setFilteredProducts(filtered);
  }, [query, category, location, products]);

  const handleViewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="max-w-[1280px] mt-20 mx-auto px-4 py-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 grid gap-4 md:grid-cols-4">
        {/* Search */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <MapPin size={16} className="text-gray-500" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Locations</option>
            {[...new Set(products.map((p) => p.location).filter(Boolean))].map(
              (loc) => (
                <option key={loc}>{loc}</option>
              )
            )}
          </select>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Briefcase size={16} className="text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Categories</option>
            {[...new Set(products.map((p) => p.category).filter(Boolean))].map(
              (cat) => (
                <option key={cat}>{cat}</option>
              )
            )}
          </select>
        </div>

        {/* Reset Filters */}
        <Button
          className="flex items-center justify-center gap-2 text-sm"
          onClick={() => {
            setQuery("");
            setCategory("All Categories");
            setLocation("All Locations");
          }}
        >
          Reset Filters
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        ) : (
          filteredProducts.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
              onClick={() => handleViewProduct(p._id)}
            >
              <div className="relative">
                <img
                  src={
                    p.productImg ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={p.name}
                  className="h-28 w-full object-cover rounded mb-3"
                />
              </div>

              <h3 className="font-semibold text-sm text-orange-600">
                {p.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-800 line-clamp-2">
                {p.description}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                📍 {p.location || "No location"}
              </p>
              <p className="text-[12px] text-gray-600">📂 {p.category}</p>

              <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-xs py-1.5">
                View Product
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;

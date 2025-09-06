import React, { useState, useEffect } from "react";
import { Briefcase, Search } from "lucide-react";
import Button from "../../components/reusable/Button";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useSearch } from "../../context/SearchContext"; // ✅ import

const Products: React.FC = () => {
  const [category, setCategory] = useState("All Categories");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const { query, setQuery } = useSearch(); // ✅ use global search
  const navigate = useNavigate();

  // ✅ Fetch products
  useEffect(() => {
    api
      .get("/api/v1/products")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.products;
        setProducts(data || []);
        setFilteredProducts(data || []);
        console.log("Fetched products:", data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Auto-filter
  useEffect(() => {
    let filtered = products;

    if (category !== "All Categories") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (query.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [category, query, products]);

  const handleViewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r fixed top-0 bottom-0 left-0">
        <div className="p-4 border-b flex items-center gap-2 font-semibold">
          <Briefcase className="text-orange-500" size={18} />
          Categories
        </div>
        <ul className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-150px)]">
          <li
            onClick={() => setCategory("All Categories")}
            className={`cursor-pointer px-3 py-2 rounded-lg ${
              category === "All Categories"
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All Categories
          </li>
          {[...new Set(products.map((p) => p.category).filter(Boolean))].map(
            (cat) => (
              <li
                key={cat}
                onClick={() => setCategory(cat)}
                className={`cursor-pointer px-3 py-2 rounded-lg ${
                  category === cat
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </li>
            )
          )}
        </ul>
        <div className="p-4">
          <Button
            className="w-full text-sm"
            onClick={() => {
              setCategory("All Categories");
              setQuery(""); // ✅ reset global search too
            }}
          >
            Reset
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        {/* Search bar (now global) */}
        <div className="mb-6 flex items-center border rounded-lg px-3 py-2 shadow-sm">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg bg-white shadow-sm hover:shadow-lg transition p-4 flex flex-col cursor-pointer"
                onClick={() => handleViewProduct(p._id)}
              >
                <div className="relative">
                  <img
                    src={
                      p.productImg ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={p.name}
                    className="h-56 w-full object-cover rounded mb-4"
                  />
                </div>

                <h3 className="font-semibold text-base text-orange-600">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {p.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">📂 {p.category}</p>

                <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-sm py-2">
                  View Product
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
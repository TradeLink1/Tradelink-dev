import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Menu, X, ArrowLeft, Search } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  productImg: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://tradelink-be.onrender.com/api/v1/products"
        );
        const fetchedProducts: Product[] = res.data.data;
        setProducts(fetchedProducts);

        // Extract unique categories
        const uniqueCats: string[] = [
          ...new Set(fetchedProducts.map((item) => item.category)),
        ];
        setCategories(uniqueCats);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/pat2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4">
        {/* Left: Burger (mobile only) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full sm:w-2/3 lg:w-1/2">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Right: Avatar */}
        <div
          onClick={() => navigate("/userProfile")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer hover:scale-110 transition ml-4"
        >
          <User className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-1/4 bg-gray-100 p-4 rounded-lg m-4">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li
              onClick={() => setSelectedCategory(null)}
              className={`cursor-pointer ${
                selectedCategory === null ? "font-bold text-orange-500" : ""
              }`}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer ${
                  selectedCategory === cat ? "font-bold text-orange-500" : ""
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>

          {/* Back to Home */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center mt-8 cursor-pointer text-gray-700 hover:text-orange-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </div>
        </div>

        {/* Sidebar - Mobile Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setMenuOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative w-3/4 max-w-xs bg-white p-6 z-50">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li
                  onClick={() => {
                    setSelectedCategory(null);
                    setMenuOpen(false);
                  }}
                  className={`cursor-pointer ${
                    selectedCategory === null ? "font-bold text-orange-500" : ""
                  }`}
                >
                  All
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMenuOpen(false);
                    }}
                    className={`cursor-pointer ${
                      selectedCategory === cat ? "font-bold text-orange-500" : ""
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>

              {/* Back to Home */}
              <div
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="flex items-center mt-8 cursor-pointer text-gray-700 hover:text-orange-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-orange-600 font-bold mt-2">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

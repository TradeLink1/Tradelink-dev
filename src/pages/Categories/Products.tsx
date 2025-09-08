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
        backgroundColor: "#f89216",
      }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
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
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
          </div>
        </div>

        {/* Right: Avatar */}
        <div
          onClick={() => navigate("/userProfile")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-white cursor-pointer hover:scale-110 transition ml-4 shadow-md"
        >
          <User className="w-6 h-6" />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-1/4 bg-white/90 backdrop-blur-md shadow-md p-6  h-[calc(100vh-4rem)] sticky top-17 overflow-y-auto">
          <h2 className="text-lg font-semibold  text-gray-700">Categories</h2>
          <ul className="space-y-3">
            <li
              onClick={() => setSelectedCategory(null)}
              className={`cursor-pointer transition ${
                selectedCategory === null
                  ? "font-semibold text-orange-600"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer transition ${
                  selectedCategory === cat
                    ? "font-semibold text-orange-600"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>

          {/* Back to Home */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center mt-10 cursor-pointer text-gray-600 hover:text-orange-500 transition"
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
              className="fixed inset-0 bg-[#ffffff9f]  backdrop-blur-sm "
              onClick={() => setMenuOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative w-3/4 max-w-xs bg-white p-6 z-50 rounded-r-xl shadow-lg">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Categories
              </h2>
              <ul className="space-y-3">
                <li
                  onClick={() => {
                    setSelectedCategory(null);
                    setMenuOpen(false);
                  }}
                  className={`cursor-pointer transition ${
                    selectedCategory === null
                      ? "font-semibold text-orange-600"
                      : "text-gray-600 hover:text-orange-500"
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
                    className={`cursor-pointer transition ${
                      selectedCategory === cat
                        ? "font-semibold text-orange-600"
                        : "text-gray-600 hover:text-orange-500"
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
                className="flex items-center mt-10 cursor-pointer text-gray-600 hover:text-orange-500 transition"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-orange-600 font-bold mt-2 text-lg">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No products available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

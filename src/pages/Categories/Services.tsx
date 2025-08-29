import { useState } from "react";
import { Link } from "react-router-dom";
import { categories as localCategories } from "../../data/categories";
import type { Category, Seller } from "../../data/categories";
import { FiMenu, FiX } from "react-icons/fi";

type SellerWithCategory = Seller & {
  categoryId: string;
  categoryTitle: string;
};

export default function Products() {
  const [categories] = useState<Category[]>(localCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allSellers: SellerWithCategory[] = categories.flatMap((cat) =>
    cat.sellers.map((s) => ({
      ...s,
      categoryId: cat.id,
      categoryTitle: cat.title,
    }))
  );

  let sellers = selectedCategory
    ? allSellers.filter((s) => s.categoryId === selectedCategory)
    : allSellers;

  sellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.products.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      seller.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  sellers.sort((a, b) => b.reviews - a.reviews);

  return (
    <div className="flex pt-20 bg-gray-50 min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 bg-white shadow-md rounded-r-xl p-5 h-screen sticky top-0">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Categories</h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer p-2 rounded-lg transition ${
              !selectedCategory
                ? "bg-[#F89216] text-white shadow"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Sellers
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`cursor-pointer p-2 rounded-lg transition ${
                selectedCategory === cat.id
                  ? "bg-[#F89216] text-white shadow"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-5 left-4 z-50 p-2 bg-[#F89216] text-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-64 h-full bg-white shadow-xl p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2 overflow-y-auto flex-1 pr-2">
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                !selectedCategory
                  ? "bg-[#F89216] text-white shadow"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedCategory(null);
                setIsMobileMenuOpen(false);
              }}
            >
              All Sellers
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`cursor-pointer p-2 rounded-lg ${
                  selectedCategory === cat.id
                    ? "bg-[#F89216] text-white shadow"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {cat.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          Sellers
        </h1>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search sellers, products, or location..."
            className="border border-gray-300 p-3 rounded-xl w-full max-w-md shadow-sm focus:ring-2 focus:ring-[#F89216] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Seller Grid */}
        {sellers.length === 0 ? (
          <p className="text-center text-gray-500">No sellers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <Link
                key={seller.id}
                to={`/Categories/Products/${seller.categoryId}/seller/${seller.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
              >
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {seller.name}
                  </h2>
                  <p className="text-gray-600 text-sm">📍 {seller.location}</p>
                  <p className="text-yellow-600 font-medium">
                    ⭐ {seller.reviews} reviews
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                    {seller.products.map((p) => p.name).join(", ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

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
    <div className="pt-20 bg-yellow-50 min-h-screen flex">
      {/* Sidebar - Desktop only */}
      <aside className=" lg:block max-tablet:hidden w-64 bg-[#ffffff] shadow-lg p-4 h-screen sticky top-0">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer p-2 rounded ${
              !selectedCategory
                ? "bg-[#F89216] text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Sellers
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`cursor-pointer p-2 rounded ${
                selectedCategory === cat.id
                  ? "bg-[#F89216] text-white"
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
      <div className="hidden fixed max-tablet:block  top-0 left-4 z-10">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 mt-25  bg-[#F89216] text-white rounded-lg shadow"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-64 h-full bg-[#ffffffde]  shadow-lg p-4 z-50 pt-40 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2 overflow-y-auto flex-1 pr-2">
            <li
              className={`cursor-pointer p-2 rounded ${
                !selectedCategory
                  ? "bg-[#F89216] text-white"
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
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory === cat.id
                    ? "bg-[#F89216] text-white"
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
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Sellers</h1>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search sellers..."
            className="border p-2 rounded w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {sellers.length === 0 ? (
          <p className="text-center text-gray-500">No sellers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <Link
                key={seller.id}
                to={`/Categories/Products/${seller.categoryId}/seller/${seller.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition"
              >
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{seller.name}</h2>
                  <p className="text-gray-600">📍 {seller.location}</p>
                  <p className="text-gray-500">⭐ {seller.reviews} reviews</p>
                  <p className="text-sm mt-2">
                    {seller.products
                      .slice(0, 2)
                      .map((p) => p.name)
                      .join(", ")}
                    {seller.products.length > 2 ? "..." : ""}
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

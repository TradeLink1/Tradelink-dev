import React, { useState/*, useEffect*/ } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import Button from "../../components/reusable/Button";
import { Link } from "react-router-dom";
import { categories as localCategories } from "../../data/categories";
import type { Category, Seller } from "../../data/categories";

export default function Products() {
  // --- OFFLINE VERSION (default) ---
  const [categories] = useState<Category[]>(localCategories);

  // --- API VERSION (commented out for now) ---
  /*
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/<your-username>/<repo>/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  */

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Flatten sellers from categories
  const allSellers: (Seller & { categoryId: string; categoryTitle: string })[] =
    categories.flatMap((cat) =>
      cat.sellers.map((s) => ({
        ...s,
        categoryId: cat.id,
        categoryTitle: cat.title,
      }))
    );

  // Filtering
  const filtered = allSellers.filter(
    (s) =>
      (query === "" || s.name.toLowerCase().includes(query.toLowerCase())) &&
      (location === "All Locations" || s.location === location) &&
      (categoryFilter === "All Categories" || s.categoryTitle === categoryFilter)
  );

  // Sort by reviews (highest first)
  filtered.sort((a, b) => b.reviews - a.reviews);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sellers</h1>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Search by sellers, location, and category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <MapPin size={16} className="text-gray-500" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Locations</option>
            {[...new Set(allSellers.map((s) => s.location))].map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Briefcase size={16} className="text-gray-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id}>{cat.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No sellers found.
          </p>
        ) : (
          filtered.map((s) => (
            <Link
              key={s.id}
              to={`/Categories/Products/${s.categoryId}/seller/${s.id}`}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
            >
              <div className="relative">
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-28 w-full object-cover rounded mb-3"
                />
              </div>
              <h3 className="font-semibold text-sm text-orange-600">
                {s.name}
              </h3>
              <p className="text-xs text-gray-500">{s.location}</p>
              <p className="text-xs text-gray-500">{s.categoryTitle}</p>
              <p className="text-[13px] text-yellow-600">⭐ {s.reviews}</p>
              <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-xs py-1.5">
                View Profile
              </Button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

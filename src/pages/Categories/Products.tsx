// src/pages/Categories/Products.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Seller {
  id: string;
  name: string;
  products: string[];
  image: string;
}

interface Category {
  id: string;
  title: string;
  image: string;
  sellers: Seller[];
}

export default function Products() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/ojele45/tradelink-api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Product Categories</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          className="border p-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCategories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/Categories/Products/${category.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition"
            >
              <img
                src={category.image}
                alt={category.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

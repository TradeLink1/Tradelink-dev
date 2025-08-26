// src/pages/Categories/ProductDetails.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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

export default function ProductDetails() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/your-username/tradelink/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error(err));
  }, [categoryId]);

  const filteredSellers =
    category?.sellers.filter((seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (!category) {
    return <div className="p-6">Loading category...</div>;
  }

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <Link to="/Categories/Products" className="text-blue-600 underline mb-4 block">
        ← Back to Categories
      </Link>

      <h1 className="text-3xl font-bold mb-6">{category.title}</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search sellers..."
          className="border p-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredSellers.length === 0 ? (
        <p className="text-center text-gray-500">No sellers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <Link
              key={seller.id}
              to={`/Categories/Products/${category.id}/seller/${seller.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition"
            >
              <img
                src={seller.image}
                alt={seller.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{seller.name}</h2>
                <p className="text-gray-600 mt-2">{seller.products.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

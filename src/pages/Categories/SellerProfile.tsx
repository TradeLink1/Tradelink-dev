import { /*useEffect, useState*/ } from "react";
import { useParams, Link } from "react-router-dom";
import { categories as localCategories } from "../../data/categorieData";

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

export default function SellerProfile() {
  const { categoryId, sellerId } = useParams();

  // --- OFFLINE VERSION (default) ---
  const category = localCategories.find((c) => c.id === categoryId);
  const seller = category?.sellers.find((s) => s.id === sellerId);

  // --- API VERSION (commented out for now) ---
  /*
  const [category, setCategory] = useState<Category | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/<your-username>/<repo>/categories?id=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCategory(data[0]);
          const foundSeller = data[0].sellers.find((s: Seller) => s.id === sellerId);
          setSeller(foundSeller || null);
        }
      })
      .catch((err) => console.error(err));
  }, [categoryId, sellerId]);
  */

  if (!category || !seller) {
    return <div className="p-6">Seller not found</div>;
  }

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <Link
        to={`/Categories/Products/${category.id}`}
        className="text-blue-600 underline mb-4 block"
      >
        ← Back to {category.title}
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <img
          src={seller.image}
          alt={seller.name}
          className="h-64 w-full object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{seller.name}</h1>
          <p className="text-gray-500 mb-4">Category: {category.title}</p>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <ul className="list-disc list-inside text-gray-700">
            {seller.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

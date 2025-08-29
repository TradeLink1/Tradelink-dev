import { useState/*, useEffect*/ } from "react";
import { useParams, Link } from "react-router-dom";
import { categories as localCategories } from "../../data/categories";

export default function SellerProfile() {
  const { categoryId, sellerId } = useParams();

  // --- OFFLINE VERSION (default) ---
  const category = localCategories.find((c) => c.id === categoryId);
  const seller = category?.sellers.find((s) => s.id === sellerId);

  // --- API VERSION (commented out for now) ---
  /*
  const [seller, setSeller] = useState<any>(null);
  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/<your-username>/<repo>/categories/${categoryId}/sellers/${sellerId}`)
      .then((res) => res.json())
      .then((data) => setSeller(data))
      .catch((err) => console.error(err));
  }, [categoryId, sellerId]);
  */

  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  if (!seller) {
    return <div className="p-6">Seller not found.</div>;
  }

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { from: "buyer", text: newMessage }]);
    setNewMessage("");
    // 🔔 Here you would trigger a notification to the seller (via backend/socket)
  };

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      {/* Back button */}
      <Link
        to="/Categories/Products"
        className="text-blue-600 underline mb-4 block"
      >
        ← Back to Categories
      </Link>

      {/* Seller Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={seller.image}
            alt={seller.name}
            className="w-40 h-40 rounded-full object-cover shadow"
          />
          <div>
            <h1 className="text-3xl font-bold">{seller.name}</h1>
            <p className="text-gray-600">📍 {seller.location}</p>
            <p className="text-gray-500">⭐ {seller.reviews} Reviews</p>
          </div>
        </div>
      </div>

      {/* Seller Products */}
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      {seller.products.length === 0 ? (
        <p className="text-gray-500">This seller has no products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seller.products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
                <p className="text-gray-500">Qty: {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
        <div className="bg-[#F89216] text-white px-4 py-2 font-semibold">
          Chat with {seller.name}
        </div>
        <div className="flex-1 p-3 overflow-y-auto max-h-60">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  msg.from === "buyer" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.from === "buyer"
                      ? "bg-[#F89216] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="p-2 flex gap-2 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded px-3 py-2 text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-[#F89216] text-white px-4 py-2 rounded text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

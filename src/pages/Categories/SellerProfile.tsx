import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { categories as localCategories } from "../../data/categories";
import Button from "../../components/reusable/Button";

export default function SellerProfile() {
  const { categoryId, sellerId } = useParams();

  // --- OFFLINE VERSION (only using categories.ts) ---
  const category = localCategories.find((c) => c.id === categoryId);
  const seller = category?.sellers.find((s) => s.id === sellerId);

  // --- API VERSION (commented out for now) ---
  /*
  const [seller, setSeller] = useState<any>(null);
  useEffect(() => {
    fetch(`https://tradelink-backend-5a6c.onrender.com/api/v1/categories/${categoryId}/sellers/${sellerId}`)
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
    // 🔔 Notification trigger would go here
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-23 min-h-screen">
      {/* Back button */}
      <Link
        to="/Categories/Products"
        className="text-blue-600 underline mb-6 block"
      >
        ← Back to Sellers
      </Link>

      {/* Seller Info Card */}
      <div className=" p-6 flex flex-col sm:flex-row gap-6 items-center mb-10">
        <img
          src={seller.image}
          alt={seller.name}
          className="h-32 w-32 rounded-full object-cover shadow"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{seller.name}</h1>
          <p className="text-gray-600">📍 {seller.location}</p>
          <p className="text-gray-500">⭐ {seller.reviews} Reviews</p>
          {/* Added contact info */}
          {seller.phone && (
            <p className="text-gray-700">📞 {seller.phone}</p>
          )}
          {seller.email && (
            <p className="text-gray-700">✉️ {seller.email}</p>
          )}
        </div>
        <Button className="bg-orange-500 text-white hover:bg-orange-600">
          Message Seller
        </Button>
      </div>

      {/* Products Grid */}
      <h2 className="text-xl font-semibold mb-4">Products by {seller.name}</h2>
      {seller.products.length === 0 ? (
        <p className="text-gray-500">This seller has no products yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {seller.products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-28 w-full object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-sm text-orange-600">
                {product.name}
              </h3>
              <p className="text-xs text-gray-700">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Qty: {product.quantity}</p>
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

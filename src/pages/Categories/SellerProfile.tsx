import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  productImg: string;
};

type Seller = {
  _id: string;
  storeName: string;
  email: string;
  phone: string;
  address?: string;
  description?: string;
  businessCategory?: string;
  businessLevel?: string;
  storeLogo?: string;
  location?: {
    city?: string;
    state?: string;
  };
};

const SellerProfile = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const navigate = useNavigate();

  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchSellerProfile = async () => {
      try {
        const res = await axios.get(
          "https://tradelink-be.onrender.com/api/v1/sellers/get/profile",
          {
            params: { sellerId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSeller(res.data?.seller || null);
      } catch (err) {
        console.error("Error fetching seller profile:", err);
      }
    };

    const fetchSellerProducts = async () => {
      try {
        const res = await axios.get(
          `https://tradelink-be.onrender.com/api/v1/products/seller/${sellerId}`
        );
        setProducts(res.data?.products || []);
      } catch (err) {
        console.error("Error fetching seller products:", err);
      }
    };

    Promise.all([fetchSellerProfile(), fetchSellerProducts()]).finally(() =>
      setLoading(false)
    );
  }, [sellerId]);

  const handleSendMessage = async () => {
    if (!message.trim() || !seller?._id) return;

    try {
      setSending(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "https://tradelink-be.onrender.com/api/v1/messages/send",
        {
          recipientId: seller._id,
          content: message,
          conversationId: "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("");
      alert("Message sent ✅");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message ❌");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!seller) return <p className="p-6 text-center">Seller not found.</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 shadow-md flex-shrink-0 sticky top-0 md:h-screen overflow-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-gray-700 hover:text-orange-500"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Seller Info */}
        <div className="flex flex-col items-center gap-4">
          {seller.storeLogo ? (
            <img
              src={seller.storeLogo}
              alt={seller.storeName || "Seller"}
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl">
              {(seller.storeName?.[0] || "S").toUpperCase()}
            </div>
          )}

          <h1 className="text-2xl font-bold text-center">
            {seller.storeName || "Seller"}
          </h1>
          <p className="text-sm text-gray-600 text-center">
            {seller.businessCategory || "Category"} • {seller.businessLevel || "Level"}
          </p>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-4 h-4" />
            {seller.location
              ? `${seller.location.city || ""}, ${seller.location.state || ""}`
              : "Location not found"}
          </p>
          {seller.description && (
            <p className="text-sm text-gray-700 mt-2 text-center">{seller.description}</p>
          )}

          {/* Contact Info */}
          <div className="mt-4 w-full space-y-2 text-left">
            {seller.email && (
              <p className="text-sm flex items-center gap-2 text-gray-700 break-all">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${seller.email}`} className="text-blue-600 hover:underline">
                  {seller.email}
                </a>
              </p>
            )}
            {seller.phone && (
              <p className="text-sm flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" />
                <a href={`tel:${seller.phone}`} className="text-blue-600 hover:underline">
                  {seller.phone}
                </a>
              </p>
            )}
          </div>

          {/* Message Box */}
          <div className="mt-6 w-full">
            <h3 className="text-lg font-semibold mb-2">Message Seller</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={sending}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Products */}
      <main className="flex-1 p-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
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
                  <p className="text-xs text-gray-400 mt-1">Qty: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </main>

      {/* Mobile Sticky Message Box */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white p-4 shadow-t flex items-center gap-2 z-50 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={sending}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default SellerProfile;

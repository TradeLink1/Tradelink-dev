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
    <div className="min-h-screen bg-[#fef6e1] ">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Seller Hero Section */}
      <header className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl max-[510px]:max-w-110 shadow-xl max-w-6xl max-tablet:max-w-190 max-mobile:max-w-90 mx-auto p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Logo */}
        {seller.storeLogo ? (
          <img
            src={seller.storeLogo}
            alt={seller.storeName || "Seller"}
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-4xl shadow-lg">
            {(seller.storeName?.[0] || "S").toUpperCase()}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold">{seller.storeName || "Seller"}</h1>
          <p className="mt-2 text-lg">
            {seller.businessCategory || "Category"} •{" "}
            {seller.businessLevel || "Level"}
          </p>
          <p className="flex items-center justify-center md:justify-start gap-1 mt-2 text-sm">
            <MapPin className="w-4 h-4" />
            {seller.location
              ? `${seller.location.city || ""}, ${seller.location.state || ""}`
              : "Location not found"}
          </p>
          {seller.description && (
            <p className="mt-4 max-w-xl text-sm md:text-base">
              {seller.description}
            </p>
          )}

          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
            {seller.email && (
              <a
                href={`mailto:${seller.email}`}
                className="flex items-center gap-2 bg-white text-orange-600 font-semibold px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            )}
            {seller.phone && (
              <a
                href={`tel:${seller.phone}`}
                className="flex items-center gap-2 bg-white text-orange-600 font-semibold px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Products Section */}
      <main className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Products by {seller.storeName}
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition transform"
              >
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-orange-600 font-bold mt-2 text-lg">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </main>

      {/* Floating Message Widget */}
      <div className="fixed bottom-6 right-6 bg-white shadow-2xl rounded-2xl p-4 w-80 z-50 border border-orange-200">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Message Seller
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={sending}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            {sending ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

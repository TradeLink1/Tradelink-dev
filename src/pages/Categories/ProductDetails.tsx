import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, Send, MapPin, ArrowLeft } from "lucide-react";

type Seller = {
  _id: string;
  storeName: string;
  email: string;
  phone: string;
  storeLogo?: string;
  description?: string;
  businessCategory?: string;
  businessLevel?: string;
  location?: {
    city?: string;
    state?: string;
  };
  address?: string;
};

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  productImg: string;
  sellerId: Seller;
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://tradelink-be.onrender.com/api/v1/products/${id}`
        );
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSendMessage = async () => {
    if (!message.trim() || !product?.sellerId?._id) return;
    try {
      setSending(true);

      // Get auth token
      const token = localStorage.getItem("token");

      await axios.post(
        "https://tradelink-be.onrender.com/api/v1/messages/send",
        {
          recipientId: product.sellerId._id,
          content: message,
          conversationId: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("");
      alert("Message sent ✅");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message ❌");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!product) return <p className="p-6 text-center">Product not found.</p>;

  return (
    <div
      className="min-h-screen p-6 bg-[#f89216]"
      style={{
        backgroundImage: "url('/pat2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="max-w-6xl mx-auto space-y-8 pb-28 md:pb-0">
        {/* Product Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition">
          {/* Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
            <img
              src={product.productImg}
              alt={product.name}
              className="w-full h-full object-contain p-6 max-h-[500px]"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              <p className="text-orange-600 font-extrabold text-2xl mt-4">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-base text-gray-700 mt-4 leading-relaxed">
                {product.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Qty available:{" "}
                <span className="font-medium">{product.quantity}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Seller Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center space-x-4">
            {product.sellerId?.storeLogo ? (
              <img
                src={product.sellerId.storeLogo}
                alt={product.sellerId.storeName}
                className="w-16 h-16 rounded-full object-cover border shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl">
                {product.sellerId?.storeName?.charAt(0) || "S"}
              </div>
            )}

            <div>
              <h2
                className="text-xl font-semibold text-gray-800 hover:text-orange-500 cursor-pointer"
                onClick={() =>
                  navigate(`/seller-profile/${product.sellerId._id}`)
                }
              >
                {product.sellerId?.storeName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {product.sellerId?.businessCategory} •{" "}
                {product.sellerId?.businessLevel}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                {product.sellerId?.location
                  ? `${product.sellerId.location.city}, ${product.sellerId.location.state}`
                  : "Location not found"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${product.sellerId?.email}`}
                className="text-blue-600 hover:underline"
              >
                {product.sellerId?.email}
              </a>
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a
                href={`tel:${product.sellerId?.phone}`}
                className="text-blue-600 hover:underline"
              >
                {product.sellerId?.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Message Box */}
      <div className="hidden md:block max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 my-8 hover:shadow-lg transition">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Message Seller
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={sending}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition"
          >
            <Send className="w-4 h-4" />
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* Mobile Sticky Message Box */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm p-4 border-t shadow-md flex items-center gap-2 z-50">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        />
        <button
          onClick={handleSendMessage}
          disabled={sending}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition"
        >
          <Send className="w-4 h-4" />
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, MapPin, ArrowLeft, MessageCircle, Send, X } from "lucide-react";

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

type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  isRead: boolean;
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // --- chat state ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

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

  // --- Messaging Functions ---
  const fetchMessages = async () => {
    if (!userId || !product?.sellerId._id) return;
    try {
      setLoadingMessages(true);
      const res = await axios.get(
        `https://tradelink-be.onrender.com/api/v1/messages/get/conversation/${userId}/${product.sellerId._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data?.messages || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      setSending(true);
      const res = await axios.post(
        "https://tradelink-be.onrender.com/api/v1/messages/send",
        {
          recipientId: product?.sellerId._id,
          content: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.message) {
        setMessages((prev) => [
          ...prev,
          {
            _id: res.data.message.id,
            conversationId: res.data.message.conversationId || "",
            senderId: userId || "",
            recipientId: product?.sellerId._id!,
            content: newMessage,
            isRead: false,
          },
        ]);
      }
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send ❌");
    } finally {
      setSending(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await axios.post(
        `https://tradelink-be.onrender.com/api/v1/messages/read/${messageId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    } catch (err) {
      console.error("Error marking message as read:", err);
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isChatOpen, product?.sellerId._id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!product) return <p className="p-6 text-center">Product not found.</p>;

  return (
    <div
      className="min-h-screen p-6 bg-gray-100 relative"
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
        className="flex items-center gap-2 mb-4 text-gray-700 hover:text-orange-500"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="max-w-6xl mx-auto space-y-6 pb-24 md:pb-0">
        {/* Product Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
            <img
              src={product.productImg}
              alt={product.name}
              className="w-full h-full object-contain p-6 max-h-[500px]"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-orange-600 font-bold text-xl mt-2">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Qty available: {product.quantity}
              </p>
            </div>
          </div>
        </div>

        {/* Seller Card */}
        <div className="bg-white rounded-xl shadow-md p-6 cursor-pointer">
          <div className="flex items-center space-x-4">
            {product.sellerId?.storeLogo ? (
              <img
                src={product.sellerId.storeLogo}
                alt={product.sellerId.storeName}
                className="w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                {product.sellerId?.storeName?.charAt(0) || "S"}
              </div>
            )}

            <div>
              <h2
                className="text-lg font-semibold hover:text-orange-500"
                onClick={() =>
                  navigate(`/seller-profile/${product.sellerId._id}`)
                }
              >
                {product.sellerId?.storeName}
              </h2>
              <p className="text-sm text-gray-600">
                {product.sellerId?.businessCategory} •{" "}
                {product.sellerId?.businessLevel}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                {product.sellerId?.location
                  ? `${product.sellerId.location.city}, ${product.sellerId.location.state}`
                  : "Location not found"}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-sm text-gray-700 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${product.sellerId?.email}`}
                className="text-blue-600"
              >
                {product.sellerId?.email}
              </a>
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <a
                href={`tel:${product.sellerId?.phone}`}
                className="text-blue-600"
              >
                {product.sellerId?.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="w-80 h-96 bg-white shadow-xl rounded-xl border flex flex-col">
            <div className="flex justify-between items-center p-3 border-b bg-orange-500 text-white rounded-t-xl">
              <h3 className="font-semibold">Chat with {product.sellerId.storeName}</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:text-red-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
              {loadingMessages ? (
                <p className="text-gray-500 text-center">Loading...</p>
              ) : messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-2 rounded-lg max-w-[80%] ${
                      msg.senderId === userId
                        ? "bg-orange-100 self-end ml-auto"
                        : "bg-gray-200"
                    }`}
                    onClick={() => !msg.isRead && markAsRead(msg._id)}
                  >
                    {msg.content}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No messages yet</p>
              )}
            </div>
            <div className="flex items-center border-t px-3 py-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={sending}
                className="ml-2 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

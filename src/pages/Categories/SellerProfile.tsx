import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, ArrowLeft, MessageCircle, Send, X, Star } from "lucide-react";

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
  description?: string;
  businessCategory?: string;
  businessLevel?: string;
  storeLogo?: string;
  location?: { city?: string; state?: string };
};

type Stats = {
  productsCount: number;
  reviewsCount: number;
};

type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  isRead: boolean;
};

const SellerProfile = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const navigate = useNavigate();

  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // --- chat state ---
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const res = await axios.get(
          `https://tradelink-be.onrender.com/api/v1/sellers/public/${sellerId}`
        );
        console.log(res.data);
        setSeller(res.data?.seller || null);
        setProducts(res.data?.products || []);
        setStats(res.data?.stats || null);
      } catch (err) {
        console.error("Error fetching seller profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProfile();
  }, [sellerId]);

 // --- review state ---
const [reviewText, setReviewText] = useState("");
const [reviewRating, setReviewRating] = useState<number>(0);
const [sendingReview, setSendingReview] = useState(false);

// --- Submit Review Handler ---
const handleSendReview = async () => {
  if (!reviewText.trim() || reviewRating === 0) {
    alert("⚠️ Please provide both a rating and a comment.");
    return;
  }
  try {
    setSendingReview(true);
    const res = await axios.post(
      `https://tradelink-be.onrender.com/api/v1/reviews/${sellerId}`,
      {
        userId,
        rating: reviewRating,
        comment: reviewText,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data?.data) {
      setStats((prev) =>
        prev ? { ...prev, reviewsCount: prev.reviewsCount + 1 } : prev
      );
      setReviewText("");
      setReviewRating(0);
      alert("✅ Review sent!");
    }
  } catch (err) {
    console.error("Error sending review:", err);
    alert("❌ Failed to send review");
  } finally {
    setSendingReview(false);
  }
};


  // --- Messaging Functions ---
  const fetchMessages = async () => {
    if (!userId || !sellerId) return;
    try {
      setLoadingMessages(true);
      const res = await axios.get(
        `https://tradelink-be.onrender.com/api/v1/messages/get/conversation/${userId}/${sellerId}`,
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
          recipientId: sellerId,
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
            recipientId: sellerId!,
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
    if (chatOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [chatOpen]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!seller) return <p className="p-6 text-center">Seller not found.</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed md:sticky top-0 left-0 h-screen w-3/4 md:w-1/3 lg:w-1/4 bg-white p-6 shadow-md overflow-y-auto z-50">
        <button
          onClick={() => navigate(-1)}
          className="hidden md:flex items-center gap-2 mb-4 text-gray-700 hover:text-orange-500"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex flex-col items-center gap-4">
          {seller.storeLogo ? (
            <img
              src={seller.storeLogo}
              alt={seller.storeName}
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl">
              {(seller.storeName?.[0] || "S").toUpperCase()}
            </div>
          )}

          <h1 className="text-2xl font-bold text-center">{seller.storeName}</h1>
          <p className="text-sm text-gray-600 text-center">
            {seller.businessCategory || "Category"} •{" "}
            {seller.businessLevel || "Level"}
          </p>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-4 h-4" />
            {seller.location
              ? `${seller.location.city || ""}, ${seller.location.state || ""}`
              : "Location not found"}
          </p>
          {seller.description && (
            <p className="text-sm text-gray-700 mt-2 text-center">
              {seller.description}
            </p>
          )}

          {stats && (
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-bold">{stats.productsCount}</p>
                <p className="text-xs text-gray-500">Products</p>
              </div>
              <div>
                <p className="font-bold">{stats.reviewsCount}</p>
                <p className="text-xs text-gray-500">Reviews</p>
              </div>
            </div>
          )}

          {/* --- Review Form with Stars --- */}
          <div className="mt-4 w-full">
  <div className="flex items-center gap-1 mb-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setReviewRating(star)}
        className={`text-2xl ${
          star <= reviewRating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </button>
    ))}
  </div>

  <textarea
    value={reviewText}
    onChange={(e) => setReviewText(e.target.value)}
    placeholder="Write a review..."
    className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-orange-500"
  />

  <button
    onClick={handleSendReview}
    disabled={sendingReview}
    className="mt-2 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
  >
    {sendingReview ? "Sending..." : "Send Review"}
  </button>
</div>


          <div className="mt-6 w-full space-y-2 text-left border-t pt-4">
            {seller.email && (
              <p className="text-sm text-gray-700 break-all">📧 {seller.email}</p>
            )}
            {seller.phone && (
              <p className="text-sm text-gray-700">📞 {seller.phone}</p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-[25%] lg:ml-[20%]">
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

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <div className="w-80 h-96 bg-white shadow-xl rounded-xl border flex flex-col">
            <div className="flex justify-between items-center p-3 border-b bg-orange-500 text-white rounded-t-xl">
              <h3 className="font-semibold">Chat with {seller.storeName}</h3>
              <button
                onClick={() => setChatOpen(false)}
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
            onClick={() => setChatOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;

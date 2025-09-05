import { useState, useEffect, useMemo } from "react";
import api from "../../api/axios";
import {
  ShoppingBag,
  MessageSquare,
  Star,
  Activity, // ✅ Account Status
  PlusCircle,
  Edit,
  Mail,
  List,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Stats {
  totalProducts: number; // ✅ still matches backend
  totalMessages: number;
  totalCustomerReviews: number;
  accountStatus: string; // ✅ frontend only
}

interface Message {
  _id: string;
  sender: string;
  totalMessages: string | number;
}

interface Review {
  _id: string;
  customerReviews: string;
  comment: string;
}

interface SellerProfile {
  storeName: string;
}

const Overview = () => {
  const navigate = useNavigate();

  const [seller, setSeller] = useState<SellerProfile>({ storeName: "" });
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalMessages: 0,
    totalCustomerReviews: 0,
    accountStatus: "Active", // ✅ hardcoded default
  });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [customerReviews, setCustomerReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No auth token found!");
        return;
      }

      try {
        const res = await api.get("api/v1/sellers/get/profile");
        const data = res.data;

        setSeller({ storeName: data.seller?.storeName || "" });

        // ✅ keep accountStatus hardcoded (don’t override with backend)
        setStats((prev) => ({
          ...prev,
          totalProducts: data.totalProducts || 0,
          totalMessages: data.totalMessages || 0,
          totalCustomerReviews: data.totalCustomerReviews || 0,
        }));

        setRecentMessages(data.recentMessages || []);
        setCustomerReviews(data.customerReviews || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Stat Cards
  const statCards = useMemo(
    () => [
      {
        title: "Total Listings", // 👀 frontend label
        value: stats.totalProducts,
        color: "from-orange-400 to-orange-600",
        icon: ShoppingBag,
      },
      {
        title: "Total Messages",
        value: stats.totalMessages,
        color: "from-blue-400 to-blue-600",
        icon: MessageSquare,
      },
      {
        title: "Customer Reviews",
        value: stats.totalCustomerReviews,
        color: "from-green-400 to-green-600",
        icon: Star,
      },
      {
        title: "Account Status", // ✅ purely frontend
        value: stats.accountStatus,
        color: "from-purple-400 to-purple-600",
        icon: Activity,
      },
    ],
    [stats]
  );

  return (
    <div className="w-full h-full min-h-screen p-8 space-y-10">
      <h1 className="text-[30px] max-mobile:text-[24px] font-bold mb-5 text-[#333333]">
        Welcome back,{" "}
        <span className="text-[#f89216]">{seller.storeName || " "}</span>
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`bg-gradient-to-r ${card.color} rounded-xl shadow-lg p-6 text-white flex flex-col gap-3 transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{card.title}</span>
                <div className="bg-white/20 p-2 rounded-lg">
                  <Icon size={26} />
                </div>
              </div>
              <div className="text-4xl font-bold">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* ✅ Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/dashboard/upload")}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <PlusCircle size={20} /> Add Listing
          </button>
          <button
            onClick={() => navigate("/dashboard/listings")}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <List size={20} /> View Listings
          </button>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <Edit size={20} /> Edit Profile
          </button>
          <button
            onClick={() => navigate("/dashboard/messages")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <Mail size={20} /> View Messages
          </button>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Messages</h2>
        {recentMessages.length > 0 ? (
          <ul className="space-y-4">
            {recentMessages.map((msg) => (
              <li
                key={msg._id}
                className="flex items-start gap-4 border-b border-gray-100 last:border-none pb-4"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f89216]/20 text-[#f89216] font-semibold">
                  {msg.sender?.charAt(0) || "?"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#333333]">{msg.sender}</p>
                  <p className="text-sm text-gray-600">{msg.totalMessages}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent messages found.</p>
        )}
      </div>

      {/* Customer Reviews */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">My Reviews</h2>
        {customerReviews.length > 0 ? (
          <ul className="space-y-4">
            {customerReviews.map((review) => (
              <li
                key={review._id}
                className="border-b border-gray-100 last:border-none pb-4"
              >
                <p className="font-medium text-[#333333]">{review.customerReviews}</p>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Overview;

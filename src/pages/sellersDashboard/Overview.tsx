import { useState, useEffect, useMemo } from "react";
import api from "../../api/axios";
import {
  ShoppingBag,
  ClipboardList,
  DollarSign,
  MessageSquare,
} from "lucide-react";

interface Stats {
  totalProducts: number;
  totalMessages: number;
}

interface Message {
  id: number;
  sender: string;
  totalMessages: string;
}

interface SellerProfile {
  storeName: string; // corrected
}

const Overview = () => {
  const [seller, setSeller] = useState<SellerProfile>({ storeName: "" });
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

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

        console.log(res.data);

        setSeller({ storeName: data.seller.storeName || "" });

        setStats({
          totalProducts: data.totalProducts,
          totalMessages: data.totalMessages,
        });

        setRecentMessages(data.recentMessages || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // stat cards
  const statCards = useMemo(
    () => [
      {
        title: "Total Products",
        value: stats.totalProducts,
        color: "from-orange-400 to-orange-600",
        icon: ShoppingBag,
      },
      {
        title: "Messages",
        value: stats.totalMessages,
        color: "from-blue-400 to-blue-600",
        icon: MessageSquare,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon; // fix here
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

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Recent Messages
        </h2>
        {recentMessages.length > 0 ? (
          <ul className="space-y-4">
            {recentMessages.map((msg) => (
              <li
                key={msg.id}
                className="flex items-start gap-4 border-b border-gray-100 last:border-none pb-4"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f89216]/20 text-[#f89216] font-semibold">
                  {msg.sender.charAt(0)}
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
    </div>
  );
};

export default Overview;

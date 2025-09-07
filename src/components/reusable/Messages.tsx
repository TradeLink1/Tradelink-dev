import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle, Send, X } from "lucide-react";

type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  isRead: boolean;
};

type MessagesProps = {
  recipientId: string; // sellerId
  recipientName?: string;
};

const Messages = ({ recipientId, recipientName }: MessagesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId"); // your logged-in userId
  const token = localStorage.getItem("token");

  // Fetch messages for this conversation
  const fetchMessages = async () => {
    if (!userId || !recipientId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://tradelink-be.onrender.com/api/v1/messages/get/conversation/${userId}/${recipientId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data?.messages || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      setSending(true);
      const res = await axios.post(
        "https://tradelink-be.onrender.com/api/v1/messages/send",
        {
          recipientId,
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
            recipientId,
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

  // Mark as read
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
    if (isOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Popup */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg flex flex-col z-50">
          {/* Header */}
          <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-2 rounded-t-lg">
            <h3 className="font-semibold text-sm">
              Chat with {recipientName || "Seller"}
            </h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 max-h-64 overflow-y-auto p-3 space-y-2 text-sm">
            {loading ? (
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

          {/* Input */}
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
      )}
    </>
  );
};

export default Messages;

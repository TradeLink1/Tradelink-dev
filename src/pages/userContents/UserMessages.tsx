"use client";

import { useState, useEffect } from "react";
import { FiSend, FiArrowLeft, FiMessageSquare } from "react-icons/fi";
import api from "../../api/axios";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  userId: string;
  unreadCount: number;
}

interface ChatMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  isRead: boolean;
  timestamp?: string;
}

const UserMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>(
    {}
  );
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("api/v1/messages/get/conversations");
      setConversations(data.conversations || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError("Failed to load conversations");
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversationMessages = async (userId: string) => {
    try {
      const { data } = await api.get(
        `api/v1/messages/get/all/conversations/${userId}`
      );
      setChatHistory((prev) => ({
        ...prev,
        [selectedChat?.id || ""]: data.messages || [],
      }));
    } catch (err) {
      console.error("Error fetching conversation messages:", err);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      await api.put(`api/v1/messages/read/${messageId}`);
    } catch (err) {
      console.error("Error marking message as read:", err);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || !selectedChat || sendingMessage) return;

    setSendingMessage(true);

    try {
      const { data } = await api.post("api/v1/messages/send", {
        recipientId: selectedChat.userId,
        content: message,
        conversationId: selectedChat.id,
      });

      const newMessage: ChatMessage = {
        _id: data.message?._id || Date.now().toString(),
        conversationId: selectedChat.id,
        senderId: "me",
        recipientId: selectedChat.userId,
        content: message,
        isRead: false,
        timestamp: new Date().toISOString(),
      };

      setChatHistory((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
      }));

      setMessage("");
      fetchConversations();
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleSelectConversation = async (conv: Conversation) => {
    setSelectedChat(conv);
    if (conv.userId) {
      await fetchConversationMessages(conv.userId);
    }
    const unreadMessages = chatHistory[conv.id]?.filter(
      (msg) => !msg.isRead && msg.senderId !== "me"
    );
    if (unreadMessages?.length) {
      unreadMessages.forEach((msg) => {
        markMessageAsRead(msg._id);
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] shadow-lg rounded-[30px] overflow-hidden max-w-[1200px] border border-gray-200 bg-white items-center justify-center">
        <p className="text-gray-500">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] shadow-lg rounded-[30px] overflow-hidden max-w-[1200px] border border-gray-200 bg-white">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-1/3 border-r border-gray-200 bg-[#ffffff] p-6 overflow-y-auto 
          transition-transform duration-300 ${
            selectedChat ? "hidden md:block" : "block"
          }`}
      >
        <h2 className="text-xl text-[#333333] font-semibold mb-4 flex items-center gap-2">
          <FiMessageSquare color="#F89216" /> Messages
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={fetchConversations}
              className="text-red-700 underline text-sm mt-1"
            >
              Retry
            </button>
          </div>
        )}

        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => handleSelectConversation(conv)}
            className={`p-3 rounded-lg cursor-pointer mb-2 transition-all 
              ${
                selectedChat?.id === conv.id
                  ? "bg-[#f89216]/10 border-l-4 border-[#f89216]"
                  : "hover:bg-gray-100"
              }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-[#1c1c1c]">{conv.name}</p>
                <p className="text-sm text-[#333333] truncate">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unreadCount > 0 && (
                <span className="bg-[#F89216] text-white text-xs rounded-full px-2 py-1 ml-2">
                  {conv.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </aside>

      {/* Chat Area */}
      <main
        id="mainchat"
        className={`flex-1 flex flex-col bg-[#ffc3794d]
        ${!selectedChat ? "hidden md:flex" : "flex"}`}
      >
        {selectedChat ? (
          <>
            <header className="p-4 font-semibold bg-[#F89216] shadow-sm flex items-center gap-3 text-[#333333]">
              <button
                className="md:hidden text-[#333333] font-bold"
                onClick={() => setSelectedChat(null)}
              >
                <FiArrowLeft size={20} />
              </button>
              <span className="text-[#333333]">{selectedChat.name}</span>
            </header>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatHistory[selectedChat.id]?.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.senderId === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`px-4 py-2 rounded-full max-w-xs break-words shadow-sm ${
                      msg.senderId === "me"
                        ? "bg-[#333333] text-white"
                        : "bg-[#ffffff] text-[#333333]"
                    } `}
                  >
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>

            <footer className="p-4 border-t border-gray-200 flex gap-2 bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !sendingMessage && handleSend()
                }
                disabled={sendingMessage}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 
                           focus:outline-none focus:ring-2 focus:ring-[#30ac57]/40
                           disabled:opacity-50"
                placeholder={
                  sendingMessage ? "Sending..." : "Type a message..."
                }
              />
              <button
                onClick={handleSend}
                disabled={sendingMessage || !message.trim()}
                className="bg-[#30ac57] hover:bg-green-700 text-white px-4 py-2 rounded-full transition flex items-center justify-center
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={18} />
              </button>
            </footer>
          </>
        ) : (
          <p className="m-auto text-gray-400 hidden md:block">
            Select a conversation to start chatting
          </p>
        )}
      </main>
    </div>
  );
};

export default UserMessages;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Messages: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, from: "Agent", text: "Hello! How can I help you?" },
    { id: 2, from: "User", text: "I want to check my order." },
  ]);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    Swal.fire({
      title: "Loading messages...",
      text: "Please wait while we fetch your conversations",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const timer = setTimeout(() => {
      Swal.close();
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      { id: messages.length + 1, from: "User", text: newMessage },
    ]);
    setNewMessage("");
  };

  if (loading) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.from === "User"
                ? "bg-green-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            <span className="text-sm">{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-[#30AC57] text-white px-4 py-2 rounded hover:bg-[#28994d] transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;

import { useState } from "react";
import { FiSend } from "react-icons/fi"; // send icon
import { FiArrowLeft } from "react-icons/fi"; // back icon
import { FiMessageSquare } from "react-icons/fi"; // conversation icon

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
}

interface ChatMessage {
  id: number;
  sender: "me" | "them";
  text: string;
}

const Messages = () => {
  const conversations: Conversation[] = [
    { id: 1, name: "Tobi Aluko", lastMessage: "Is this product available?" },
    { id: 2, name: "Emeka Uche", lastMessage: "Can you deliver tomorrow?" },
    { id: 3, name: "Amina Abubakar", lastMessage: "What’s your best price?" },
  ];

  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<number, ChatMessage[]>>(
    {
      1: [{ id: 1, sender: "them", text: "Is this product available?" }],
      2: [{ id: 1, sender: "them", text: "Can you deliver tomorrow?" }],
      3: [{ id: 1, sender: "them", text: "What’s your best price?" }],
    }
  );
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "me",
      text: message,
    };

    setChatHistory((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }));

    setMessage("");
  };

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
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setSelectedChat(conv)}
            className={`p-3 rounded-lg cursor-pointer mb-2 transition-all 
              ${
                selectedChat?.id === conv.id
                  ? "bg-[#f89216]/10 border-l-4 border-[#f89216]"
                  : "hover:bg-gray-100"
              }`}
          >
            <p className="font-semibold text-[#1c1c1c]">{conv.name}</p>
            <p className="text-sm text-[#333333] truncate">
              {conv.lastMessage}
            </p>
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
            {/* Header */}
            <header className="p-4  font-semibold bg-[#F89216] shadow-sm flex items-center gap-3 text-[#333333]">
              <button
                className="md:hidden text-[#333333] font-bold"
                onClick={() => setSelectedChat(null)}
              >
                <FiArrowLeft size={20} />
              </button>
              <span className="text-[#333333]">{selectedChat.name}</span>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatHistory[selectedChat.id]?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`px-4 py-2 rounded-full max-w-xs break-words shadow-sm ${
                      msg.sender === "me"
                        ? "bg-[#333333] text-white"
                        : "bg-[#ffffff] text-[#333333]"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input */}
            <footer className="p-4 border-t border-gray-200 flex gap-2 bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 
                           focus:outline-none focus:ring-2 focus:ring-[#30ac57]/40"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="bg-[#30ac57] hover:bg-green-700 text-white px-4 py-2 rounded-full transition flex items-center justify-center"
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

export default Messages;

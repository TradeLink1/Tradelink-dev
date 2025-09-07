import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/reusable/Button";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  BellOff,
  Bell,
} from "lucide-react";

interface ServiceProviderDetailsProps {
  provider: any;
  onBack?: () => void;
  onSelectProvider: (provider: any) => void;
  user?: { id: string; name: string }; // logged-in user
}

const ServiceProviderDetails: React.FC<ServiceProviderDetailsProps> = ({
  provider,
  onBack,
  onSelectProvider,
  user,
}) => {
  const getImage = (item: any) => {
    const src =
      //       (item?.serviceImg &&
      //         String(item.serviceImg).trim() !== "" &&
      //         item.serviceImg) ||
      //       (item?.productImg &&
      //         String(item.productImg).trim() !== "" &&
      //         item.productImg) ||
      (item?.logo && String(item.logo).trim() !== "" && item.logo) ||
      (item?.serviceImg &&
        String(item.serviceImg).trim() !== "" &&
        item.serviceImg) ||
      (item?.productImg &&
        String(item.productImg).trim() !== "" &&
        item.productImg) ||
      (item?.image && String(item.image).trim() !== "" && item.image) ||
      null;
    return (
      src ||
      `https://via.placeholder.com/400x300.png?text=${encodeURIComponent(
        item?.name || item?.storeName || "No Image"
      )}`
    );
  };

  // State
  const [currentProvider, setCurrentProvider] = useState(provider);
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [otherListingsState, setOtherListingsState] = useState<any[]>([]);
  const [similarServicesState, setSimilarServicesState] = useState<any[]>([]);
  const [loadingReview, setLoadingReview] = useState(false);

  // Chatbox state
  type Msg = { from: "user" | "provider"; text: string };
  const [messages, setMessages] = useState<Msg[]>([
    { from: "provider", text: "Hello 👋 How can I help you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatScrollRef.current)
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Fetch provider details
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          `https://tradelink-be.onrender.com/api/v1/services/${currentProvider._id}`
        );
        const data = await res.json();
        setServicesOffered(
          Array.isArray(data.servicesOffered) ? data.servicesOffered : []
        );
        setWorkingHours(
          Array.isArray(data.workingHours) ? data.workingHours : []
        );
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (e) {
        console.error("Failed to fetch service details", e);
      }
    };
    if (currentProvider?._id) run();
  }, [currentProvider]);

  // Fetch other listings
  useEffect(() => {
    const run = async () => {
      try {
        if (!currentProvider?.sellerId) {
          setOtherListingsState([]);
          return;
        }
        const res = await fetch(
          `https://tradelink-be.onrender.com/api/v1/products/seller/${currentProvider.sellerId}`
        );
        const data = await res.json();
        // Remove current provider from other listings if present
        const filtered = Array.isArray(data)
          ? data.filter((p) => p._id !== currentProvider._id)
          : [];
        setOtherListingsState(filtered);
      } catch (e) {
        setOtherListingsState([]);
      }
    };
    run();
  }, [currentProvider]);

  useEffect(() => {
    const run = async () => {
      try {
        const category =
          currentProvider?.businessCategory || currentProvider?.category;
        if (!category) {
          setSimilarServicesState([]);
          return;
        }
        const res = await fetch(
          "https://tradelink-be.onrender.com/api/v1/services/all"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          const cleaned = data.filter(
            //             (s: any) => s.category === category && s._id !== provider._id
            //           );
            //           if (cleaned.length > 0) {
            //             setSimilarServicesState(cleaned);
            //             return;
            //           }
            //         }
            //         setSimilarServicesState([]);

            (s: any) =>
              s.businessCategory === category && s._id !== currentProvider._id
          );
          setSimilarServicesState(cleaned);
        }
      } catch (e) {
        setSimilarServicesState([]);
      }
    };
    run();
  }, [currentProvider]);

  // Add review
  const handleAddReview = async () => {
    if (!user) {
      alert("Only logged-in users can submit reviews.");
      return;
    }
    if (newReview.trim() === "") return;
    try {
      setLoadingReview(true);
      const res = await fetch(
        `https://tradelink-be.onrender.com/api/v1/services/${currentProvider._id}/reviews`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            userId: user.id,
            rating,
            comment: newReview,
          }),
        }
      );
      const updated = await res.json();
      if (Array.isArray(updated.reviews)) setReviews(updated.reviews);
      else
        setReviews((prev) => [
          ...prev,
          { id: prev.length + 1, name: user.name, rating, comment: newReview },
        ]);
      setNewReview("");
      setRating(5);
    } catch (e) {
      console.error("Add review failed", e);
      alert("Failed to submit review. Try again.");
    } finally {
      setLoadingReview(false);
    }
  };

  // Chat send
  const handleSendMessage = () => {
    if (isMuted) return;
    const text = newMessage.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setNewMessage("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "provider",
          text: "Thanks for your message. We’ll get back shortly!",
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  // Call provider
  const rawPhone = String(currentProvider?.phone || "").trim();
  const displayPhone = rawPhone || "";
  const telPhone = rawPhone.replace(/[^+\d]/g, "");
  const handleCallProvider = async () => {
    if (!telPhone)
      return alert("Phone number not available for this provider.");
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) return void (window.location.href = `tel:${telPhone}`);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(displayPhone || telPhone);
        alert(`Provider phone copied: ${displayPhone || telPhone}`);
      } else alert(`Please call this provider: ${displayPhone || telPhone}`);
    } catch {
      alert(`Please call this provider: ${displayPhone || telPhone}`);
    }
  };

  const handleBack = () => {
    if (onBack) return onBack();
    window.history.back();
  };

  // Swap provider logic
  const handleSelectProvider = (selected: any) => {
    if (!selected) return;
    setOtherListingsState((prev) => {
      const filtered = prev.filter(
        (p) => p._id !== selected._id && p.id !== selected.id
      );
      return [...filtered, currentProvider];
    });
    setCurrentProvider(selected);
    onSelectProvider(selected);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 mt-20">
      <Button
        name="← Back to Providers"
        bgColor="#F97316"
        textColor="#fff"
        borderColor="#F97316"
        hoverBgColor="#EA580C"
        onClick={handleBack}
      />

      {/* HERO */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg mb-10">
        <img
          src={getImage(provider)}
          alt={provider.storeName || provider.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl font-bold text-white">
            {provider.storeName || provider.name}
          </h1>
          <p className="text-orange-300 font-medium">
            {provider.businessCategory || provider.category}
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={getImage(currentProvider)}
                alt={
                  currentProvider?.name ||
                  currentProvider?.storeName ||
                  "Provider"
                }
                className="w-full md:w-60 h-60 object-cover rounded"
              />
              <div>
                <h1 className="text-2xl font-bold text-orange-600 mb-2">
                  {currentProvider?.storeName || currentProvider?.name || "—"}
                </h1>
                <p className="text-gray-700 mb-1">
                  Category:{" "}
                  <strong>{currentProvider?.businessCategory || "—"}</strong>
                </p>
                <p className="text-gray-700 mb-1">
                  Owner: {currentProvider?.name || "—"}
                </p>
                <p className="text-gray-700 mb-1 flex items-center gap-2">
                  <Phone size={16} /> {displayPhone || "—"}
                </p>
                <p className="text-gray-700 mb-1 flex items-center gap-2">
                  <Mail size={16} /> {currentProvider?.email || "—"}
                </p>
                <p className="text-gray-700 mb-1 flex items-center gap-2">
                  <MapPin size={16} /> {currentProvider?.location || "—"}
                </p>
                <p className="text-gray-600 mt-4">
                  {currentProvider?.description ||
                    "We provide top-notch services with a guarantee of quality and reliability."}
                </p>
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Services Offered
            </h2>
            {servicesOffered.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {servicesOffered.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No services listed.</p>
            )}
          </div>

          {/* REVIEWS */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((r: any, idx: number) => (
                  <div
                    key={idx}
                    className="border-b pb-3 last:border-none last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{r.name}</p>
                      <div className="flex text-yellow-500">
                        {Array.from({ length: r.rating || 5 }).map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No reviews yet.</p>
              )}
            </div>

            {/* Add Review */}
            <div className="mt-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{rating} / 5</span>
              </div>

              <textarea
                className="w-full h-32 border rounded p-2 text-sm mb-2"
                placeholder={
                  user ? "Write your review..." : "Login to submit a review"
                }
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <Button
                onClick={handleAddReview}
                name={loadingReview ? "Submitting..." : "Submit Review"}
                bgColor="#F97316"
                textColor="#fff"
                borderColor="#F97316"
                hoverBgColor="#EA580C"
              />
            </div>
          </div>

          {/* Other Listings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Other Listings
            </h2>
            {otherListingsState.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {otherListingsState.map((o: any) => (
                  <div
                    key={o._id || o.id}
                    className="cursor-pointer"
                    onClick={() => handleSelectProvider(o)}
                  >
                    <img
                      src={getImage(o)}
                      alt={o.storeName || o.name}
                      className="w-full h-28 object-cover rounded-xl group-hover:scale-105 transition"
                    />
                    <p className="text-sm font-medium text-gray-800">
                      {o.storeName || o.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {o.businessCategory || o.category}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No other listings found.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          {/* LOCATION */}
          <div className="bg-white shadow-lg rounded-2xl p-6  top-20">
            <h2 className="text-lg font-bold text-orange-600 mb-3">Location</h2>
            <img
              src="https://via.placeholder.com/400x200.png?text=Map+Preview"
              alt="Map"
              className="w-full rounded-xl mb-2"
            />
            <p className="text-gray-600 mt-2">
              {currentProvider?.location || "—"}
            </p>
          </div>

          {/* Working Hours */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-orange-600 mb-2">
              Working Hours
            </h2>
            {workingHours.length > 0 ? (
              <ul className="text-gray-700 text-sm space-y-1">
                {workingHours.map((wh, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Clock size={16} /> {wh}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                No working hours provided.
              </p>
            )}
          </div>

          {/* Contact + Chat */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-orange-600 mb-4 text-center">
              Get in Touch
            </h2>
            <div className="flex justify-center mb-4">
              <Button
                name={
                  displayPhone ? `Call ${displayPhone}` : "Contact Provider"
                }
                bgColor="#F97316"
                textColor="#fff"
                borderColor="#F97316"
                hoverBgColor="#EA580C"
                onClick={handleCallProvider}
              />
            </div>

            {/* Chat box */}
            <div className="border rounded-lg">
              <div className="flex items-center justify-between px-3 py-2 border-b">
                <p className="text-sm font-medium text-gray-700">
                  Chat with Provider
                </p>
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  className="text-gray-500 hover:text-orange-500"
                  aria-label={isMuted ? "Unmute chat" : "Mute chat"}
                >
                  {isMuted ? <BellOff size={18} /> : <Bell size={18} />}
                </button>
              </div>

              <div
                ref={chatScrollRef}
                className="h-64 overflow-y-auto p-3 space-y-2 bg-white"
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[80%] p-2 rounded-lg text-sm leading-snug ${
                      msg.from === "user"
                        ? "bg-orange-500 text-white ml-auto"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-gray-600 text-xs">
                    <Loader2 className="animate-spin" size={14} />
                    <span>Provider is typing…</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 border-t p-2">
                <input
                  type="text"
                  className={`flex-1 border rounded px-3 py-2 text-sm outline-none ${
                    isMuted
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "focus:ring-2 focus:ring-orange-300"
                  }`}
                  placeholder={
                    isMuted ? "Chat is muted…" : "Type your message..."
                  }
                  value={newMessage}
                  onChange={(e) => !isMuted && setNewMessage(e.target.value)}
                  onKeyDown={(e) =>
                    !isMuted && e.key === "Enter" && handleSendMessage()
                  }
                  disabled={isMuted}
                />
                <button
                  type="button"
                  onClick={!isMuted ? handleSendMessage : undefined}
                  disabled={isMuted}
                  className={`p-2 rounded-lg ${
                    isMuted
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
          {/* SIMILAR SERVICES */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-bold text-orange-600 mb-4">
              Similar Services
            </h2>
            {similarServicesState.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {similarServicesState.map((s: any) => (
                  <div
                    key={s._id || s.id}
                    onClick={() => onSelectProvider(s)}
                    className="cursor-pointer group"
                  >
                    <img
                      src={getImage(s)}
                      alt={s.storeName || s.name}
                      className="w-full h-24 object-cover rounded-xl group-hover:scale-105 transition"
                    />
                    <p className="text-xs font-medium text-gray-800 truncate mt-1">
                      {s.storeName || s.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {s.businessCategory || s.category}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No similar services available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetails;

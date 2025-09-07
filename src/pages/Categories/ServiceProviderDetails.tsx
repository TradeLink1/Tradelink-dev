import React, { useState, useEffect } from "react";
import Button from "../../components/reusable/Button";
import { Star, Phone, Mail, MapPin, Clock } from "lucide-react";

interface ServiceProviderDetailsProps {
  provider: any;
  onBack: () => void;
  onSelectProvider: (provider: any) => void;
}

const ServiceProviderDetails: React.FC<ServiceProviderDetailsProps> = ({
  provider,
  onBack,
  onSelectProvider,
}) => {
  const getImage = (item: any) => {
    const src =
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

  const services = [
    "Car Engine Repair",
    "Brake System Fix",
    "Electrical Diagnostics",
    "Oil Change",
    "Wheel Balancing",
  ];

  const initialReviews = [
    { id: 1, name: "Chika O.", rating: 5, comment: "Excellent service!" },
    {
      id: 2,
      name: "Adewale K.",
      rating: 4,
      comment: "Very reliable and professional.",
    },
    {
      id: 3,
      name: "Ngozi A.",
      rating: 5,
      comment: "Fixed my car faster than expected.",
    },
  ];

  const [otherListingsState, setOtherListingsState] = useState<any[]>([]);
  const [similarServicesState, setSimilarServicesState] = useState<any[]>([]);
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        if (!provider?.sellerId) {
          setOtherListingsState([]);
          return;
        }
        const res = await fetch(
          `https://backend-dev-ltev.onrender.com/api/v1/products/seller/${provider.sellerId}`
        );
        const data = await res.json();
        setOtherListingsState(Array.isArray(data) ? data : []);
      } catch (e) {
        setOtherListingsState([]);
      }
    };
    run();
  }, [provider]);

  useEffect(() => {
    const run = async () => {
      try {
        const category = provider?.businessCategory || provider?.category;
        if (!category) {
          setSimilarServicesState([]);
          return;
        }
        const res = await fetch(
          "https://backend-dev-ltev.onrender.com/api/v1/services/all"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          const cleaned = data.filter(
            (s: any) => s.category === category && s._id !== provider._id
          );
          if (cleaned.length > 0) {
            setSimilarServicesState(cleaned);
            return;
          }
        }
        setSimilarServicesState([]);
      } catch (e) {
        setSimilarServicesState([]);
      }
    };
    run();
  }, [provider]);

  const handleAddReview = () => {
    if (newReview.trim() === "") return;
    const newEntry = {
      id: reviews.length + 1,
      name: "Anonymous User",
      rating: 5,
      comment: newReview,
    };
    setReviews([...reviews, newEntry]);
    setNewReview("");
  };

  return (
    <div className="max-w-[1280px] mb-20 mt-25 mx-auto px-4 py-10">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          name="← Back to Providers"
          bgColor="#F97316"
          textColor="#fff"
          borderColor="#F97316"
          hoverBgColor="#EA580C"
          onClick={onBack}
        />
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          {/* ABOUT */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              About the Provider
            </h2>
            <p className="text-gray-700 mb-2">
              {provider.description ||
                "We provide reliable services with guaranteed quality."}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-gray-700 mt-4">
              <p className="flex items-center gap-2">
                <Phone size={18} /> {provider.phone || "—"}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} /> {provider.email || "—"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} /> {provider.location || "—"}
              </p>
            </div>
          </div>

          {/* SERVICES */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Services Offered
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
              {services.map((s, i) => (
                <li key={i} className="bg-gray-50 px-3 py-2 rounded-lg">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* REVIEWS */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{r.name}</p>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <textarea
                className="w-full h-24 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500"
                placeholder="Write your review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <div className="mt-2">
                <Button
                  onClick={handleAddReview}
                  name="Submit Review"
                  bgColor="#F97316"
                  textColor="#fff"
                  borderColor="#F97316"
                  hoverBgColor="#EA580C"
                />
              </div>
            </div>
          </div>

          {/* OTHER LISTINGS */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Other Listings
            </h2>
            {otherListingsState.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {otherListingsState.map((o: any) => (
                  <div
                    key={o._id || o.id}
                    onClick={() => onSelectProvider(o)}
                    className="cursor-pointer group"
                  >
                    <img
                      src={getImage(o)}
                      alt={o.storeName || o.name}
                      className="w-full h-28 object-cover rounded-xl group-hover:scale-105 transition"
                    />
                    <p className="text-sm font-medium text-gray-800 mt-1">
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
            <p className="text-gray-600">{provider.location || "—"}</p>
          </div>

          {/* HOURS */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-bold text-orange-600 mb-3">
              Working Hours
            </h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <Clock size={16} /> Mon - Fri: 8am - 6pm
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} /> Sat: 9am - 4pm
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} /> Sun: Closed
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h2 className="text-lg font-bold text-orange-600 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-3">
              <Button
                name="📞 Contact Provider"
                bgColor="#F97316"
                textColor="#fff"
                borderColor="#F97316"
                hoverBgColor="#EA580C"
                onClick={() => alert("Calling provider...")}
              />
              <Button
                name="💬 Send Message"
                bgColor="#fff"
                textColor="#F97316"
                borderColor="#F97316"
                hoverBgColor="#FFEDD5"
                onClick={() => alert("Opening chat...")}
              />
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

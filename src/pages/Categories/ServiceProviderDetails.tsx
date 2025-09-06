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
  // ✅ helper: safe image getter
  const getImage = (item: any) => {
    const src =
      (item?.serviceImg && String(item.serviceImg).trim() !== "" && item.serviceImg) ||
      (item?.productImg && String(item.productImg).trim() !== "" && item.productImg) ||
      (item?.image && String(item.image).trim() !== "" && item.image) ||
      null;
    return (
      src ||
      `https://via.placeholder.com/300x200.png?text=${encodeURIComponent(
        item?.name || item?.storeName || "No Image"
      )}`
    );
  };

  // Static fallback for reviews + services offered
  const services = [
    "Car Engine Repair",
    "Brake System Fix",
    "Electrical Diagnostics",
    "Oil Change",
    "Wheel Balancing",
  ];

  const initialReviews = [
    { id: 1, name: "Chika O.", rating: 5, comment: "Excellent service!" },
    { id: 2, name: "Adewale K.", rating: 4, comment: "Very reliable and professional." },
    { id: 3, name: "Ngozi A.", rating: 5, comment: "Fixed my car faster than expected." },
  ];

  const [otherListingsState, setOtherListingsState] = useState<any[]>([]);
  const [similarServicesState, setSimilarServicesState] = useState<any[]>([]);
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState("");

  // 🔗 Fetch Other Listings → products by seller
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
        if (Array.isArray(data)) {
          setOtherListingsState(data);
        } else {
          setOtherListingsState([]);
        }
      } catch (e) {
        console.error("Other listings fetch failed", e);
        setOtherListingsState([]);
      }
    };
    run();
  }, [provider]);

  // 🔗 Fetch Similar Services → services in same category; if none, fallback to products
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
        // fallback: products (if no similar services)
        if (provider?.sellerId) {
          const prodRes = await fetch(
            `https://backend-dev-ltev.onrender.com/api/v1/products/seller/${provider.sellerId}`
          );
          const prodData = await prodRes.json();
          if (Array.isArray(prodData)) {
            setSimilarServicesState(prodData);
            return;
          }
        }
        setSimilarServicesState([]);
      } catch (e) {
        console.error("Similar services fetch failed", e);
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
    <div className="max-w-[1280px] mx-auto px-4 py-8 mt-20">
      <Button
        name="← Back to Providers"
        bgColor="#F97316"
        textColor="#fff"
        borderColor="#F97316"
        hoverBgColor="#EA580C"
        onClick={onBack}
      />

      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        Service Provider Information
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={getImage(provider)}
                alt={provider.name || provider.storeName}
                className="w-full md:w-60 h-60 object-cover rounded"
              />
              <div>
                <h1 className="text-2xl font-bold text-orange-600 mb-2">
                  {provider.storeName || provider.name}
                </h1>
                <p className="text-gray-700 mb-1">
                  Category:{" "}
                  <strong>{provider.businessCategory || provider.category}</strong>
                </p>
                <p className="text-gray-700 mb-1">Owner: {provider.name || "—"}</p>
                <p className="text-gray-700 mb-1 flex items-center gap-2">
                  <Phone size={16} /> {provider.phone || "—"}
                </p>
                <p className="text-gray-700 mb-1 flex items-center gap-2">
                  <Mail size={16} /> {provider.email || "—"}
                </p>
                <p className="text-gray-700 mb-1 flex items-center gap-2">
                  <MapPin size={16} /> {provider.location || "—"}
                </p>
                <p className="text-gray-600 mt-4">
                  {provider.description ||
                    "We provide top-notch services with a guarantee of quality and reliability."}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Services Offered
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Reviews */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border-b pb-3 last:border-none last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{r.name}</p>
                    <div className="flex text-yellow-500">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review Box */}
            <div className="mt-4">
              <textarea
                className="w-1/2 h-32 border rounded p-2 text-sm"
                placeholder="Write your review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <div>
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
                    onClick={() => onSelectProvider(o)}
                  >
                    <img
                      src={getImage(o)}
                      alt={o.storeName || o.name}
                      className="w-full h-28 object-cover rounded border mb-2"
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
              <p className="text-gray-500 text-sm">No other listings found.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Location */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-orange-600 mb-2">Location</h2>
            <img
              src="https://via.placeholder.com/400x200.png?text=Map+Preview"
              alt="Map"
              className="w-full rounded"
            />
            <p className="text-gray-600 mt-2">{provider.location || "—"}</p>
          </div>

          {/* Working Hours */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-orange-600 mb-2">
              Working Hours
            </h2>
            <ul className="text-gray-700 text-sm space-y-1">
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

          {/* Contact */}
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-bold text-orange-600 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-2">
              <Button
                name="Contact Provider"
                bgColor="#F97316"
                textColor="#fff"
                borderColor="#F97316"
                hoverBgColor="#EA580C"
                onClick={() => alert("Calling provider...")}
              />
              <Button
                name="Send Message"
                bgColor="#fff"
                textColor="#F97316"
                borderColor="#F97316"
                hoverBgColor="#FFEDD5"
                onClick={() => alert("Opening chat...")}
              />
            </div>
          </div>

          {/* Similar Services */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-orange-600 mb-4">
              Similar Services
            </h2>
            {similarServicesState.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {similarServicesState.map((s: any) => (
                  <div
                    key={s._id || s.id}
                    className="cursor-pointer"
                    onClick={() => onSelectProvider(s)}
                  >
                    <img
                      src={getImage(s)}
                      alt={s.storeName || s.name}
                      className="w-full h-24 object-cover rounded border mb-1"
                    />
                    <p className="text-xs font-medium text-gray-800 truncate">
                      {s.storeName || s.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No similar services available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetails;

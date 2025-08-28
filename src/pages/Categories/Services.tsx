import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, Clock, SlidersHorizontal } from "lucide-react";
import Button from "../../components/reusable/Button";
import ServiceProviderDetail from "../Categories/ServiceProviderDetails";
import { useNavigate } from "react-router-dom";

const ServiceProviders: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [service, setService] = useState("All Services");
  const [time, setTime] = useState("All Times");
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);
  const [popularServices, setPopularServices] = useState([
    { name: "Plumber", icon: "🛠️", searches: 50 },
    { name: "Electrician", icon: "💡", searches: 45 },
    { name: "Carpenter", icon: "🪚", searches: 40 },
    { name: "Makeup Artist", icon: "💄", searches: 35 },
    { name: "Tailor", icon: "✂️", searches: 30 },
  ]);

  const navigate = useNavigate();

  // Sample providers
  const providers = [
    { name: "John Doe", category: "Plumber", location: "Lagos", rating: 4.8, verified: true, image: "https://via.placeholder.com/150", description: "Expert in plumbing works with 10 years experience." },
    { name: "Jane Smith", category: "Electrician", location: "Abuja", rating: 4.6, verified: false, image: "https://via.placeholder.com/150", description: "Specialist in electrical installations and repairs." },
    { name: "Michael Johnson", category: "Carpenter", location: "Port Harcourt", rating: 4.5, verified: true, image: "https://via.placeholder.com/150", description: "Craftsman skilled in furniture and woodwork." },
    { name: "Aisha Bello", category: "Makeup Artist", location: "Kano", rating: 4.7, verified: true, image: "https://via.placeholder.com/150", description: "Professional makeup artist for events and weddings." },
    { name: "Chinedu Okafor", category: "Tailor", location: "Enugu", rating: 4.4, verified: false, image: "https://via.placeholder.com/150", description: "Custom clothing and fashion design specialist." },
    { name: "Fatima Yusuf", category: "Hair Stylist", location: "Ibadan", rating: 4.6, verified: true, image: "https://via.placeholder.com/150", description: "Hair stylist with creative and trendy designs." },
    { name: "Samuel Adeyemi", category: "Photographer", location: "Jos", rating: 4.9, verified: true, image: "https://via.placeholder.com/150", description: "Experienced in event and studio photography." },
    { name: "Grace Williams", category: "Caterer", location: "Benin City", rating: 4.3, verified: false, image: "https://via.placeholder.com/150", description: "Provides catering for events and private parties." },
  ];

  const filtered = providers.filter(
    (p) =>
      (query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())) &&
      (location === "All Locations" || p.location === location) &&
      (service === "All Services" || p.category === service)
  );

  // Auto-update popular services top 5 at noon
  useEffect(() => {
    const updatePopular = () => {
      // For demonstration, we sort by searches descending
      setPopularServices((prev) => [...prev].sort((a, b) => b.searches - a.searches).slice(0, 5));
    };

    const now = new Date();
    const millisTillNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0).getTime() - now.getTime();
    const timeout = millisTillNoon > 0 ? millisTillNoon : millisTillNoon + 86400000;

    const timer = setTimeout(() => {
      updatePopular();
      setInterval(updatePopular, 24 * 60 * 60 * 1000); // every 24h
    }, timeout);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[1280px] mt-20 mx-auto px-4 py-6">

      {/* Popular Services */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Popular Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {popularServices.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center border border-orange-500 rounded-lg p-4 bg-white shadow-sm hover:shadow-md cursor-pointer transition"
              onClick={() => setService(s.name)}
            >
              <span className="text-3xl mb-2">{s.icon}</span>
              <p className="text-sm font-medium text-gray-800">{s.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <MapPin size={16} className="text-gray-500" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Locations</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Port Harcourt</option>
            <option>Kano</option>
            <option>Enugu</option>
            <option>Ibadan</option>
            <option>Jos</option>
            <option>Benin City</option>
          </select>
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Briefcase size={16} className="text-gray-500" />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Services</option>
            <option>Plumber</option>
            <option>Electrician</option>
            <option>Carpenter</option>
            <option>Makeup Artist</option>
            <option>Tailor</option>
            <option>Hair Stylist</option>
            <option>Photographer</option>
            <option>Caterer</option>
          </select>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No providers found.</p>
        ) : (
          filtered.map((p, idx) => (
            <div
              key={idx}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
              onClick={() => {
                const isLoggedIn = !!localStorage.getItem("authToken");
                if (isLoggedIn) {
                  navigate("/login");
                  return;
                }
                setSelectedProvider(p);
              }}
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-28 w-full object-cover rounded mb-3"
                />
                {p.verified && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-[12px] px-1.5 py-0.5 rounded">
                    Verified
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-lg sm:text-sm text-orange-600">{p.category}</h3>
              <p className="font-medium text-[11px] sm:text-xs text-gray-800">{p.name}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">{p.location}</p>
              <p className="text-[20px] text-yellow-600">⭐ {p.rating}</p>
              <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-xs py-1.5">
                View Profile
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedProvider && (
        <ServiceProviderDetail
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
};

export default ServiceProviders;

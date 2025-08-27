import React, { useState } from "react";
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

  const navigate = useNavigate();

  // sample providers (8 total)
  const providers = [
    {
      name: "John Doe",
      category: "Plumber",
      location: "Lagos",
      rating: 4.8,
      verified: true,
      image: "https://via.placeholder.com/150",
      description: "Expert in plumbing works with 10 years experience.",
    },
    {
      name: "Jane Smith",
      category: "Electrician",
      location: "Abuja",
      rating: 4.6,
      verified: false,
      image: "https://via.placeholder.com/150",
      description: "Specialist in electrical installations and repairs.",
    },
    {
      name: "Michael Johnson",
      category: "Carpenter",
      location: "Port Harcourt",
      rating: 4.5,
      verified: true,
      image: "https://via.placeholder.com/150",
      description: "Craftsman skilled in furniture and woodwork.",
    },
    {
      name: "Aisha Bello",
      category: "Makeup Artist",
      location: "Kano",
      rating: 4.7,
      verified: true,
      image: "https://via.placeholder.com/150",
      description: "Professional makeup artist for events and weddings.",
    },
    {
      name: "Chinedu Okafor",
      category: "Tailor",
      location: "Enugu",
      rating: 4.4,
      verified: false,
      image: "https://via.placeholder.com/150",
      description: "Custom clothing and fashion design specialist.",
    },
    {
      name: "Fatima Yusuf",
      category: "Hair Stylist",
      location: "Ibadan",
      rating: 4.6,
      verified: true,
      image: "https://via.placeholder.com/150",
      description: "Hair stylist with creative and trendy designs.",
    },
    {
      name: "Samuel Adeyemi",
      category: "Photographer",
      location: "Jos",
      rating: 4.9,
      verified: true,
      image: "https://via.placeholder.com/150",
      description: "Experienced in event and studio photography.",
    },
    {
      name: "Grace Williams",
      category: "Caterer",
      location: "Benin City",
      rating: 4.3,
      verified: false,
      image: "https://via.placeholder.com/150",
      description: "Provides catering for events and private parties.",
    },
  ];

  const filtered = providers.filter(
    (p) =>
      (query === "" || p.name.toLowerCase().includes(query.toLowerCase())) &&
      (location === "All Locations" || p.location === location) &&
      (service === "All Services" || p.category === service)
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 grid gap-4 md:grid-cols-5">
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
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Clock size={16} className="text-gray-500" />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Times</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
        <Button className="flex items-center justify-center gap-2 text-sm">
          <SlidersHorizontal size={16} /> More Filters
        </Button>
      </div>

      {/* Providers grid (8 on xl) */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-4">
  {filtered.map((p, idx) => (
    <div
      key={idx}
      className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
      onClick={() => {
        const isLoggedIn = !!localStorage.getItem("authToken");
        if (!isLoggedIn) {
          navigate("/login"); // redirect if not logged in
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

      {/* Service (category) first */}
      <h3 className="font-semibold text-lg sm:text-sm text-orange-600">
        {p.category}
      </h3>

      {/* Provider name under service */}
      <p className="font-medium text-[11px] sm:text-xs text-gray-800">
        {p.name}
      </p>

      {/* Location */}
      <p className="text-[10px] sm:text-xs text-gray-500">{p.location}</p>

      {/* Rating */}
      <p className="text-[20px] text-yellow-600">⭐ {p.rating}</p>

      <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-xs py-1.5">
        View Profile
      </Button>
    </div>
  ))}
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

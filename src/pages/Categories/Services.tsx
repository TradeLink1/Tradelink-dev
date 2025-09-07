// ServiceProviders.tsx
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Wrench,
  Zap,
  Home,
  Paintbrush,
} from "lucide-react";
import Button from "../../components/reusable/Button";
import ServiceProviderDetails from "./ServiceProviderDetails";

const ServiceProviders: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [service, setService] = useState("All Services");
  const [providers, setProviders] = useState<any[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState("Auto Mechanics");
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  const popularServices = [
    { icon: <Wrench size={16} />, label: "Auto Mechanics", location: "Ikorodu" },
    { icon: <Zap size={16} />, label: "Electricians", location: "All Areas" },
    { icon: <Home size={16} />, label: "Cleaning", location: "All Areas" },
    { icon: <Paintbrush size={16} />, label: "Handyman", location: "All Areas" },
    { icon: <Wrench size={16} />, label: "Plumber", location: "All Areas" },
  ];

  // ✅ Fetch providers from correct API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch(
          "https://tradelink-be.onrender.com/api/v1/services/all"
        );
        const data = await res.json();
        setProviders(data || []);
        setFilteredProviders(data || []);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

  // ✅ Apply search + filters
  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const filtered = providers.filter((p) => {
      const matchesQuery =
        !query ||
        p.storeName?.toLowerCase().includes(lowerQuery) ||
        p.businessCategory?.toLowerCase().includes(lowerQuery) ||
        p.name?.toLowerCase().includes(lowerQuery);

      const matchesLocation =
        location === "All Locations" || p.location === location;

      const matchesService =
        service === "All Services" || p.businessCategory === service;

      return matchesQuery && matchesLocation && matchesService;
    });

    setFilteredProviders(filtered);
  }, [query, location, service, providers]);

  if (selectedProvider) {
    return (
      <ServiceProviderDetails
        provider={selectedProvider}
        onBack={() => setSelectedProvider(null)}
        onSelectProvider={(p) => setSelectedProvider(p)}
      />
    );
  }

  return (
    <div className="max-w-[1280px] mt-20 mx-auto px-4 py-6">
      {/* Popular Services Header */}
      <h2 className="text-xl font-bold text-orange-600 mb-4">
        Popular Services
      </h2>
      <div className="bg-[#FFF7E8] px-4 py-6 rounded-lg">
        {/* Popular Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {popularServices.map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center border rounded-xl px-4 py-3 min-w-[120px] cursor-pointer transition ${
                selectedService === item.label
                  ? "border-orange-500 bg-white text-orange-600 shadow"
                  : "border-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedService(item.label)}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="font-medium text-sm">{item.label}</span>
              <span className="text-xs text-gray-500">{item.location}</span>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          {/* Search */}
          <div className="flex items-center w-full md:w-1/3 border rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full text-sm outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Location Filter */}
          <div className="flex items-center w-full md:w-1/4 border rounded-lg px-3 py-2">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <select
              className="w-full text-sm outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>Ikorodu</option>
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

          {/* Service Filter */}
          <div className="flex items-center w-full md:w-1/4 border rounded-lg px-3 py-2">
            <Briefcase size={16} className="text-gray-500 mr-2" />
            <select
              className="w-full text-sm outline-none"
              value={service}
              onChange={(e) => setService(e.target.value)}
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

          <Button className="text-orange-600 border border-orange-400 px-4 py-2 rounded-md text-sm hover:bg-orange-100 transition">
            More Filters
          </Button>
        </div>
      </div>

      {/* Providers Grid */}
      <h2 className="text-xl font-bold text-orange-600 mt-10 mb-2">
        All Services
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Showing {filteredProviders.length} of {providers.length} services
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {filteredProviders.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No providers found.
          </p>
        ) : (
          filteredProviders.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
              onClick={() => setSelectedProvider(p)}
            >
              {/* Large Image */}
              <img
                src={
                  p.logo ||
                  p.serviceImg ||
                  p.image ||
                  "https://via.placeholder.com/300x200.png?text=Service"
                }
                alt={p.storeName}
                className="h-40 w-full object-cover border border-gray-200 rounded mb-3"
              />

              {/* Title */}
              <h3 className="font-semibold text-sm text-orange-600 truncate">
                {p.storeName || "Untitled Service"}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {p.description || "No description provided."}
              </p>

              {/* Category */}
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                <Briefcase size={12} className="text-gray-400" />
                {p.businessCategory || "General"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceProviders;


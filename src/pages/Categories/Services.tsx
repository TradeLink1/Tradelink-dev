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

const Services: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [service, setService] = useState("All Services");
  const [providers, setProviders] = useState<any[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState("Auto Mechanics");
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  const popularServices = [
    {
      icon: <Wrench size={20} />,
      label: "Auto Mechanics",
      location: "Ikorodu",
    },
    { icon: <Zap size={20} />, label: "Electricians", location: "All Areas" },
    { icon: <Home size={20} />, label: "Cleaning", location: "All Areas" },
    {
      icon: <Paintbrush size={20} />,
      label: "Handyman",
      location: "All Areas",
    },
    { icon: <Wrench size={20} />, label: "Plumber", location: "All Areas" },
  ];

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

  // Filtering logic
  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const lowerLocation = location.toLowerCase();
    const lowerService = service.toLowerCase();
    const filtered = providers.filter((p) => {
      const matchesQuery =
        !query ||
        p.storeName?.toLowerCase().includes(lowerQuery) ||
        p.businessCategory?.toLowerCase().includes(lowerQuery) ||
        p.name?.toLowerCase().includes(lowerQuery) ||
        (p.servicesOffered &&
          p.servicesOffered.some((s: string) =>
            s.toLowerCase().includes(lowerQuery)
          ));
      const matchesLocation =
        location === "All Locations" ||
        p.location?.toLowerCase() === lowerLocation ||
        p.location?.toLowerCase().includes(lowerLocation);

      const matchesService =
        service === "All Services" ||
        p.businessCategory?.toLowerCase() === lowerService ||
        p.businessCategory?.toLowerCase().includes(lowerService);

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
    <div className="max-w-[1200px] mt-20 mx-auto px-4 py-6">
      {/* Hero */}
      <div className="relative mt-20 bg-gradient-to-r from-gray-800 to-gray-600 rounded-3xl py-12 px-6 mb-14 shadow-md">
        <h1 className="text-4xl font-extrabold text-white text-center">
          Find <span className="text-white">Trusted Providers</span>
        </h1>
        <p className="text-white mt-3 text-center max-w-2xl mx-auto">
          Browse local services, compare providers, and hire with confidence.
        </p>
      </div>
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
                className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {/* Location Dropdown */}
            <div className="flex items-center w-full md:w-1/4 border rounded-xl px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
              <MapPin size={18} className="text-orange-500 mr-2" />
              <select
                className="w-full text-sm bg-transparent outline-none"
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
            {/* Service Dropdown */}
            <div className="flex items-center w-full md:w-1/4 border rounded-xl px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
              <Briefcase size={18} className="text-orange-500 mr-2" />
              <select
                className="w-full text-sm bg-transparent outline-none"
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
            <Button className="bg-orange-500 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-orange-600 transition shadow-md">
              More Filters
            </Button>
          </div>
        </div>

        {/* Popular Services */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Popular Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
          {popularServices.map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center rounded-2xl px-4 py-6 cursor-pointer transition transform hover:scale-105 hover:shadow-lg ${
                selectedService === item.label
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedService(item.label)}
            >
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-full mb-3 ${
                  selectedService === item.label
                    ? "bg-white text-orange-500"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {item.icon}
              </div>
              <span className="font-semibold text-sm">{item.label}</span>
              <span
                className={`text-xs ${
                  selectedService === item.label
                    ? "text-orange-100"
                    : "text-gray-400"
                }`}
              >
                {item.location}
              </span>
            </div>
          ))}
        </div>

        {/* Providers Grid */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">All Services</h2>
        <p className="text-sm text-gray-500 mb-6">
          Showing {filteredProviders.length} of {providers.length} services
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProviders.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No providers found.
            </p>
          ) : (
            filteredProviders.map((p) => (
              <div
                key={p._id}
                className="border rounded-2xl bg-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col cursor-pointer"
                onClick={() => setSelectedProvider(p)}
              >
                {/* Large Image */}
                <img
                  src={
                    //                   p.image ||
                    //                   "https://via.placeholder.com/300x200.png?text=Service"
                    //                 }
                    //                 alt={p.name}
                    //                 className="h-36 w-full object-cover rounded-lg mb-4"
                    //               />
                    //               <h3 className="font-semibold text-lg text-gray-800 truncate">
                    //                 {p.storeName}
                    //               </h3>
                    //               <p className="text-sm font-medium text-orange-600">
                    //                 {p.businessCategory || "General Service"}
                    //               </p>
                    //               <p className="text-xs text-gray-500 truncate">{p.email}</p>
                    //               <span className="inline-block mt-2 text-xs font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded-full w-fit">
                    //                 {p.location || "Available"}
                    //               </span>
                    //               <Button className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:opacity-90 text-sm py-2 rounded-xl shadow-md">
                    //                 View Profile
                    //               </Button>

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
      {/* Close the max-w-[1200px] container */}
    </div>
  );
};

export default Services;


import React, { useState } from "react";
import { Search, MapPin, Briefcase, Clock, X } from "lucide-react";
import Button from "../../reusable/Button";

const ServiceProviders: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [service, setService] = useState("All Services");
  const [time, setTime] = useState("All Times");
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  const providers = [
    {
      name: "Ikorodu Auto Mechanic Services",
      category: "Auto Mechanics",
      location: "Ikorodu",
      rating: 4.7,
      verified: true,
      image: "/images/mechanic.jpg",
      time: "Anytime",
      email: "ikoroduauto@gmail.com",
      phone: "+234 801 234 5678",
      description:
        "We provide expert auto repair and maintenance services with fast turnaround time.",
      terms:
        "Customer must provide genuine spare parts. Payment is held in escrow until service is confirmed.",
      available: "Mon - Sat (8am - 6pm)",
      cost: "Negotiable",
    },
    {
      name: "Somolu Electrical Solutions",
      category: "Electricians",
      location: "Somolu",
      rating: 4.9,
      verified: true,
      image: "/images/electrician.jpg",
      time: "Anytime",
      email: "somoluelec@gmail.com",
      phone: "+234 809 876 5432",
      description:
        "Licensed electricians for residential, office and industrial projects.",
      terms:
        "Workmanship guaranteed. Escrow must be funded before service begins.",
      available: "Mon - Fri (9am - 5pm)",
      cost: "Negotiable",
    },
    {
      name: "Mile 12 Cleaning Services",
      category: "Cleaning",
      location: "Mile 12",
      rating: 4.4,
      verified: false,
      image: "/images/cleaning.jpg",
      time: "Anytime",
      email: "mile12cleaning@gmail.com",
      phone: "+234 802 333 4455",
      description:
        "Affordable cleaning services for homes, offices and events.",
      terms: "Escrow payment required. Service charged per visit.",
      available: "Mon - Sun (7am - 8pm)",
      cost: "Negotiable",
    },
  ];

  const locations = [
    "All Locations",
    ...new Set(providers.map((p) => p.location)),
  ];
  const services = [
    "All Services",
    ...new Set(providers.map((p) => p.category)),
  ];
  const times = ["All Times", "Anytime"];

  const popular = [
    { label: "Auto Mechanics", sub: "Ikorodu" },
    { label: "Electricians", sub: "All Areas" },
    { label: "Cleaning", sub: "All Areas" },
    { label: "Handyman", sub: "All Areas" },
  ];

  const filtered = providers.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase());

    const matchesLocation =
      location === "All Locations" || p.location === location;
    const matchesService = service === "All Services" || p.category === service;
    const matchesTime = time === "All Times" || p.time === time;

    return matchesQuery && matchesLocation && matchesService && matchesTime;
  });

  return (
    <div className="bg-[#fdf7ec] min-h-screen px-4 sm:px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto p-4 sm:p-6">
        {/* Popular Services */}
        <h2 className="text-base font-semibold mb-3">Popular Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {popular.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setService(item.label);
                if (item.sub === "All Areas") setLocation("All Locations");
                else setLocation(item.sub);
              }}
              className={`border rounded-lg p-2 sm:p-3 text-center cursor-pointer transition text-xs sm:text-sm ${
                service === item.label
                  ? "border-orange-400 text-orange-500"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <p className="font-medium">{item.label}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 p-3 bg-white rounded-lg shadow mb-6">
          {/* Search input */}
          <div className="flex items-center border rounded-md px-2 py-1 flex-1 min-w-[160px]">
            <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-xs"
            />
          </div>

          {/* All Locations */}
          <div className="flex items-center gap-2 text-gray-600 min-w-[130px]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent outline-none text-xs cursor-pointer w-full"
            >
              {locations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* All Services */}
          <div className="flex items-center gap-2 text-gray-600 min-w-[130px]">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="bg-transparent outline-none text-xs cursor-pointer w-full"
            >
              {services.map((srv, i) => (
                <option key={i} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
          </div>

          {/* All Times */}
          <div className="flex items-center gap-2 text-gray-600 min-w-[130px]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-transparent outline-none text-xs cursor-pointer w-full"
            >
              {times.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* More Filters button */}
          <div className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto border border-orange-400 text-orange-500 hover:bg-orange-50 text-xs px-3 py-1">
              More Filters
            </Button>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-sm font-semibold mb-3">
          {filtered.length} service providers found
        </h2>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filtered.map((p, idx) => (
            <div
              key={idx}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
              onClick={() => setSelectedProvider(p)}
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
              <h3 className="font-medium text-xs sm:text-sm">{p.name}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {p.category} • {p.location}
              </p>
              <p className="text-[20px] text-yellow-600">⭐ {p.rating}</p>
              <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-xs py-1.5">
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-lg p-5 relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setSelectedProvider(null)}
            >
              <X size={18} />
            </button>
            <img
              src={selectedProvider.image}
              alt={selectedProvider.name}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">
              {selectedProvider.name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Category:</strong> {selectedProvider.category}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Location:</strong> {selectedProvider.location}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {selectedProvider.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Phone:</strong> {selectedProvider.phone}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Available:</strong> {selectedProvider.available}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Cost:</strong> {selectedProvider.cost}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Description:</strong> {selectedProvider.description}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Terms & Conditions:</strong> {selectedProvider.terms}
            </p>

            {/* Escrow & Payment Options */}
            <div className="border-t pt-3 mt-3">
              <h3 className="font-semibold text-lg mb-2">Payment Options</h3>
              <ul className="text-lg text-gray-600 list-disc ml-4 mb-3">
                <li>Escrow: Admin holds and releases funds after service</li>
                <li>Pay with Bank Transfer</li>
                <li>Pay with Card</li>
                <li>Appeal available for breaches</li>
              </ul>
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600 text-sm py-2">
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviders;

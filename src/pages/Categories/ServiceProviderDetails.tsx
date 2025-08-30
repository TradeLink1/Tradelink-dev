import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ServiceProviderDetails: React.FC = () => {
  const { providerId } = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Fetch provider details
    fetch(`/api/v1/sellers/get/profile?id=${providerId}`)
      .then((response) => response.json())
      .then((data) => setProvider(data))
      .catch((error) => console.error("Error fetching provider:", error));

    // Fetch provider services
    fetch(`/api/v1/services/seller/${providerId}`)
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, [providerId]);

  if (!provider) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1280px] mt-20 mx-auto px-4 py-6">
      <div className="bg-white p-4 rounded-2xl shadow mb-6">
        <h2 className="text-2xl font-semibold">{provider.name}</h2>
        <p className="text-lg text-gray-700">{provider.description}</p>

        {/* Provider Info */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-orange-600">{service.name}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetails;

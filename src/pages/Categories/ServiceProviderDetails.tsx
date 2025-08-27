import React from "react";
import { X } from "lucide-react";
import Button from "../../components/reusable/Button";

interface Props {
  provider: any;
  onClose: () => void;
}

const ServiceProviderDetail: React.FC<Props> = ({ provider, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        {/* Info */}
        <h2 className="text-lg font-semibold mb-1">{provider.name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {provider.category} • {provider.location}
        </p>
        <p className="text-yellow-600 mb-3">⭐ {provider.rating}</p>

        <p className="text-sm text-gray-700 mb-4">{provider.description}</p>

        <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
          Contact Provider
        </Button>
      </div>
    </div>
  );
};

export default ServiceProviderDetail;

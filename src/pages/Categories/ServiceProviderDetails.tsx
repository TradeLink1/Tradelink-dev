import React from "react";
import Button from "../../components/reusable/Button";

interface Props {
  provider: any;
  onClose: () => void;
}

const ServiceProviderDetail: React.FC<Props> = ({ provider, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-40 object-cover rounded-2xl mb-4"
        />
        <h2 className="text-xl font-semibold text-orange-600 mb-2">{provider.category}</h2>
        <p className="font-medium text-gray-800 mb-1">{provider.name}</p>
        <p className="text-gray-500 mb-2">{provider.location}</p>
        <p className="text-yellow-600 text-lg mb-4">⭐ {provider.rating}</p>
        <p className="text-gray-700 mb-4">{provider.description}</p>
        <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
          Contact
        </Button>
      </div>
    </div>
  );
};

export default ServiceProviderDetail;

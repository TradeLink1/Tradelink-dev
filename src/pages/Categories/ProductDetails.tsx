import { useParams } from "react-router-dom";
import { dummyData } from "../../data/dummyData";

const ProductDetails = () => {
  const { id } = useParams();
  const item = dummyData.find((p) => p.data.product._id === id);

  if (!item) { 
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">❌ Product not found</p>
      </div>
    );
  }

  const { product, seller } = item.data;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-[100px]">
      {/* Left side - Product Images + Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Product Main Image */}
        <div className="border rounded-2xl overflow-hidden shadow">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-3">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition"
            />
          ))}
        </div>

        {/* Product Details Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div>
            <p className="text-2xl font-semibold text-blue-600">
              ₦{product.price}
            </p>
            <p className="text-sm text-gray-500">
              Available Quantity: {product.quantity}
            </p>
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Contact Seller
          </button>
        </div>
      </div>

      {/* Right side - Seller Sidebar */}
      <aside className="border rounded-2xl shadow p-5 bg-gray-50 h-fit  top-6">
        <h2 className="text-lg font-semibold mb-4">Seller Information</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={seller.profileImage}
            alt={seller.name}
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <p className="font-semibold">{seller.name}</p>
            <p className="text-sm text-gray-600">{seller.phone}</p>
            <p className="text-xs text-green-600">
              {seller.verified ? "✅ Verified Seller" : "⚠️ Not Verified"}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>📅 Joined: {new Date(seller.joinDate).toLocaleDateString()}</p>
          <p>⏳ Avg Response: {seller.averageResponseTime}</p>
          <p>💬 Feedbacks: {seller.feedbackCount}</p>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetails;
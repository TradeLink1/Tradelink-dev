import { useState } from "react";
import { motion } from "framer-motion";
import KycPopup from "./kycPopup";

const UploadProduct = () => {
  const [uploadType, setUploadType] = useState<"product" | "service">(
    "product"
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<any>({});
  const [isVerified, setIsVerified] = useState(false);

  if (!isVerified) {
    return <KycPopup onVerify={() => setIsVerified(true)} />;
  }

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Price must be a valid number";

    if (
      uploadType === "product" &&
      (!formData.stock || isNaN(Number(formData.stock)))
    ) {
      newErrors.stock = "Stock must be a valid number";
    }

    if (!formData.image) newErrors.image = "Please upload an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("uploadType", uploadType);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      if (uploadType === "product") {
        formDataToSend.append("stock", formData.stock);
      }
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      console.log(
        "Prepared product/service data:",
        Object.fromEntries(formDataToSend)
      );
      alert(
        `${
          uploadType === "product" ? "Product" : "Service"
        } uploaded successfully!`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-[30px] shadow-lg p-8">
        {/* Header */}
        <h2 className="text-[30px] leading-8 font-bold text-center text-[#f89216] max-mobile:text-[25px] mb-8">
          Upload {uploadType === "product" ? "Product" : "Service"}
        </h2>

        {/* Toggle Switch */}
        <div className="relative flex w-72 mx-auto mb-8 bg-[#f8921651] rounded-full p-1">
          <motion.div
            layout
            className="absolute top-1 bottom-1 w-1/2 bg-[#f89216] rounded-full"
            initial={false}
            animate={{
              x: uploadType === "product" ? 0 : "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          {/* Buttons */}
          <button
            onClick={() => setUploadType("product")}
            className={`relative z-10 flex-1 text-center font-semibold py-2 transition-colors ${
              uploadType === "product" ? "text-white" : "text-gray-600"
            }`}
          >
            Product
          </button>
          <button
            onClick={() => setUploadType("service")}
            className={`relative z-10 flex-1 text-center font-semibold py-2 transition-colors ${
              uploadType === "service" ? "text-white" : "text-gray-600"
            }`}
          >
            Service
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {uploadType === "product" ? "Product Name" : "Service Name"}
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded-full p-3 bg-white focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {uploadType === "product" ? (
                <>
                  <option value="grocery">Groceries & Essentials</option>
                  <option value="fashion">Fashion & Clothing</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home & Kitchen</option>
                </>
              ) : (
                <>
                  <option value="hair">Hair Stylist</option>
                  <option value="plumber">Plumber</option>
                  <option value="photographer">Photographer</option>
                  <option value="mechanic">Mechanic</option>
                </>
              )}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Stock only if product */}
          {uploadType === "product" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
                onChange={handleChange}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
              )}
            </div>
          )}

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full border border-gray-300 rounded-2xl p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-10 py-3 text-lg font-semibold text-white bg-[#f89216] rounded-full shadow hover:bg-[#333333] transform hover:scale-105 transition-all"
            >
              Upload {uploadType === "product" ? "Product" : "Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;

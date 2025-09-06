"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios"; // products

const UploadProduct = () => {
  const [uploadType, setUploadType] = useState<"product" | "service">(
    "product"
  );

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    imageFile: null as File | null,
  });

  const [serviceData, setServiceData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageFile: null as File | null,
  });

  type ErrorFields = {
    name?: string;
    category?: string;
    price?: string;
    quantity?: string;
    imageFile?: string;
    description?: string;
    submit?: string;
  };

  const [errors, setErrors] = useState<ErrorFields>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (uploadType === "product") {
      if (files) {
        setProductData({ ...productData, imageFile: files[0] });
      } else {
        setProductData({ ...productData, [name]: value });
      }
    } else {
      if (files) {
        setServiceData({ ...serviceData, imageFile: files[0] });
      } else {
        setServiceData({ ...serviceData, [name]: value });
      }
    }
  };

  const validateForm = () => {
    const newErrors: ErrorFields = {};
    const data = uploadType === "product" ? productData : serviceData;

    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!data.price || isNaN(Number(data.price)))
      newErrors.price = "Price must be a valid number";

    if (
      uploadType === "product" &&
      (!productData.quantity || isNaN(Number(productData.quantity)))
    ) {
      newErrors.quantity = "Quantity must be a valid number";
    }

    if (!data.imageFile)
      newErrors.imageFile = `A ${uploadType} image is required`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      const data = uploadType === "product" ? productData : serviceData;

      formDataToSend.append("name", data.name);
      formDataToSend.append("category", data.category);
      formDataToSend.append("price", data.price);
      formDataToSend.append("description", data.description);

      if (uploadType === "product") {
        formDataToSend.append("quantity", productData.quantity);
        if (productData.imageFile)
          formDataToSend.append("productImg", productData.imageFile);
      } else {
        const sellerId = localStorage.getItem("sellerId") || "";
        if (sellerId) formDataToSend.append("sellerId", sellerId);

        if (serviceData.imageFile) {
          formDataToSend.append("serviceImg", serviceData.imageFile);
        }
      }

      // ✅ corrected here
      const axiosInstance = api;
      const endpoint =
        uploadType === "product"
          ? "/api/v1/products"
          : "/api/v1/services/create";

      const response = await api.post(endpoint, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(`${uploadType} created successfully:`, response.data);
      setSubmitSuccess(true);

      if (uploadType === "product") {
        setProductData({
          name: "",
          category: "",
          price: "",
          quantity: "",
          description: "",
          imageFile: null,
        });
      } else {
        setServiceData({
          name: "",
          category: "",
          price: "",
          description: "",
          imageFile: null,
        });
      }

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) (fileInput as HTMLInputElement).value = "";
    } catch (error) {
      const err = (error as any)?.response?.data;
      setErrors({
        submit:
          err?.message || `Failed to upload ${uploadType}. Please try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const data = uploadType === "product" ? productData : serviceData;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-[30px] shadow-lg p-8">
        <h2 className="text-[30px] leading-8 font-bold text-center text-[#f89216] max-mobile:text-[25px] mb-8">
          Upload {uploadType === "product" ? "Product" : "Service"}
        </h2>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {uploadType === "product" ? "Product" : "Service"} uploaded
            successfully!
            <button
              onClick={() => setSubmitSuccess(false)}
              className="ml-2 text-green-800 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {errors.submit}
          </div>
        )}

        <div className="relative flex w-72 mx-auto mb-8 bg-[#f8921651] rounded-full p-1">
          <motion.div
            layout
            className="absolute top-1 bottom-1 w-1/2 bg-[#f89216] rounded-full"
            initial={false}
            animate={{ x: uploadType === "product" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {uploadType === "product" ? "Product Name" : "Service Name"}
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={data.category}
              className="w-full border border-gray-300 rounded-full p-3 bg-white focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {uploadType === "product" ? (
                <>
                  <option value="Groceries & Essentials">
                    Groceries & Essentials
                  </option>
                  <option value="Fresh & Perishables">
                    Fresh & Perishables
                  </option>
                  <option value="Fashion & Clothing">Fashion & Clothing</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Building Materials & Hardware">
                    Building Materials & Hardware
                  </option>
                  <option value="Electronics & Gadgets">
                    Electronics & Gadgets
                  </option>
                  <option value="Automobile & Parts">Automobile & Parts</option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Toys, Baby & Kids">Toys, Baby & Kids</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Books, Stationery & Office">
                    Books, Stationery & Office
                  </option>
                </>
              ) : (
                <>
                  <option value="Hair Stylist">Hair Stylist</option>
                  <option value="Fashion Designer">Fashion Designer</option>
                  <option value="Caterer">Caterer</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Makeup Artist">Makeup Artist</option>
                  <option value="Barber">Barber</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Car Wash">Car Wash</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {uploadType === "product" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
                onChange={handleChange}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.imageFile && (
              <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              rows={4}
              className="w-full border border-gray-300 rounded-2xl p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-10 py-3 text-lg font-semibold text-white rounded-full shadow transform transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#f89216] hover:bg-[#333333] hover:scale-105"
              }`}
            >
              {isLoading
                ? "Uploading..."
                : `Upload ${uploadType === "product" ? "Product" : "Service"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;

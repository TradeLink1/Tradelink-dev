  "use client";

  import { useState } from "react";
  import { motion } from "framer-motion";
  import api from "../../api/axios";

  const UploadProduct = () => {
    const [uploadType, setUploadType] = useState<"product" | "service">("product");

    const [formData, setFormData] = useState({
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
      productImg: null as File | null,
    });

    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, files } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    };

    const validateForm = () => {
      const newErrors: any = {};

      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "Price must be a valid number";
      if (uploadType === "product" && (!formData.quantity || isNaN(Number(formData.quantity)))) {
        newErrors.quantity = "quantity must be a valid number";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsLoading(true);
      setErrors({});

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", Number(formData.price).toString());
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", formData.description);

        if (uploadType === "product") {
          formDataToSend.append("quantity", Number(formData.quantity).toString());
          if (formData.productImg) formDataToSend.append("productImg", formData.productImg);
        } else {
          if (formData.productImg) formDataToSend.append("serviceImg", formData.productImg);
        }

        const endpoint =
          uploadType === "product"
            ? "https://tradelink-backend-5a6c.onrender.com/api/v1/products/create"
            : "https://tradelink-backend-5a6c.onrender.com/api/v1/services/create";

        // Get token from localStorage (or another secure storage)
        const token = localStorage.getItem("token");

        if (!token) {
          setErrors({ submit: "No authentication token found. Please log in." });
          setIsLoading(false);
          return;
        }

        const response = await api.post(endpoint, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // attach token
          },
        });

        console.log(`${uploadType} uploaded successfully:`, response.data);
        setSubmitSuccess(true);

        // Reset form
        setFormData({
          name: "",
          category: "",
          price: "",
          quantity: "",
          description: "",
          productImg: null,
        });

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";

      } catch (error: any) {
        if (error.response) {
          console.error("Backend response error:", error.response.data);
          setErrors({
            submit: error.response.data.message || `Failed to upload ${uploadType}.`,
          });
        } else if (error.request) {
          console.error("No response from backend:", error.request);
          setErrors({
            submit: `No response from server. Please try again.`,
          });
        } else {
          console.error("Error creating request:", error.message);
          setErrors({
            submit: `Error: ${error.message}`,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full bg-white rounded-[30px] shadow-lg p-8">
          <h2 className="text-[30px] leading-8 font-bold text-center text-[#f89216] max-mobile:text-[25px] mb-8">
            Upload {uploadType === "product" ? "Product" : "Service"}
          </h2>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
              {uploadType === "product" ? "Product" : "Service"} uploaded successfully!
              <button onClick={() => setSubmitSuccess(false)} className="ml-2 text-green-800 hover:text-green-900">
                
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
              className={`relative z-10 flex-1 text-center font-semibold py-2 transition-colors ${uploadType === "product" ? "text-white" : "text-gray-600"}`}
            >
              Product
            </button>
            <button
              onClick={() => setUploadType("service")}
              className={`relative z-10 flex-1 text-center font-semibold py-2 transition-colors ${uploadType === "service" ? "text-white" : "text-gray-600"}`}
            >
              Service
            </button>
          </div>

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
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                className="w-full border border-gray-300 rounded-full p-3 bg-white focus:ring-2 focus:ring-[#f89216] outline-none"
                value={formData.category}
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
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* quantity */}
            {uploadType === "product" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">quantity Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
              </div>
            )}

            {/* productImg */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload productImg</label>
              <input
                type="file"
                name="productImg"
                accept="productImg/*"
                className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
                onChange={handleChange}
              />
              {errors.productImg && <p className="text-red-500 text-sm mt-1">{errors.productImg}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                className="w-full border border-gray-300 rounded-2xl p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-10 py-3 text-lg font-semibold text-white rounded-full shadow transform transition-all ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#f89216] hover:bg-[#333333] hover:scale-105"}`}
              >
                {isLoading ? "Uploading..." : `Upload ${uploadType === "product" ? "Product" : "Service"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default UploadProduct;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

// BENEFITS DATA
const benefits = [
  {
    icon: <IoIosPeople size={42} className="text-[#30ac57]" />,
    title: "Reach More Customers",
    text: "Expand your business reach by showcasing your products and services online.",
  },
  {
    icon: <MdManageAccounts size={40} className="text-[#30ac57]" />,
    title: "Easy to Manage",
    text: "Manage listings, track messages, and update products easily in your dashboard.",
  },
  {
    icon: <TbBulb size={40} className="text-[#30ac57]" />,
    title: "Build Your Brand",
    text: "Showcase your business professionally and stand out from competitors.",
  },
];

const SellWithUs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    businessLevel: "",
    category: "",
    address: "",
    description: "",
    sampleImage: null as File | null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    let newErrors: any = {};
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.businessLevel)
      newErrors.businessLevel = "Select a business level";
    if (!formData.category) newErrors.category = "Select a category";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Seller Registration Data:", formData);
      alert("Seller registered successfully!");
      localStorage.setItem("sellerLoggedIn", "true");
      navigate("/dashboard");
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10">
      {/* HERO */}
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl mt-25 font-bold text-[#222] mb-4">
          Start Selling on <span className="text-[#30ac57]">TradeLink</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of sellers connecting with more customers daily.
        </p>
        <a href="#register-form">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#30ac57] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#28a14e] transition"
          >
            Start Selling Now
          </motion.button>
        </a>
      </motion.div>

      {/* BENEFITS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
        {benefits.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-[30px] p-6 text-center shadow hover:shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg text-[#222] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* FORM */}
      <motion.div
        id="register-form"
        className="bg-white shadow-lg rounded-3xl p-8 md:p-12 mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#222] mb-10">
          Seller Registration
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Text Fields */}
          {[
            { name: "businessName", label: "Business Name", type: "text" },
            { name: "ownerName", label: "Seller's Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <input
                type={type}
                name={name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#30ac57] focus:ring-2 focus:ring-[#30ac57]/30 transition"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Business Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Level
            </label>
            <select
              name="businessLevel"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#30ac57] focus:ring-2 focus:ring-[#30ac57]/30 transition"
            >
              <option value="">-- Select Level --</option>
              <option value="individual">Individual Seller</option>
              <option value="small">Small Business</option>
              <option value="enterprise">Large Enterprise</option>
            </select>
            {errors.businessLevel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.businessLevel}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#30ac57] focus:ring-2 focus:ring-[#30ac57]/30 transition"
            >
              <option value="">-- Select Category --</option>
              <option value="products">Products</option>
              <option value="services">Services</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#30ac57] focus:ring-2 focus:ring-[#30ac57]/30 transition"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#30ac57] focus:ring-2 focus:ring-[#30ac57]/30 transition min-h-[100px]"
            ></textarea>
          </div>

          {/* Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Sample (Optional)
            </label>
            <input
              type="file"
              name="sampleImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#30ac57] file:text-white hover:file:bg-[#28a14e] cursor-pointer"
            />
          </div>

          {/* Passwords */}
          {[
            {
              name: "password",
              label: "Password",
              show: showPassword,
              setShow: setShowPassword,
            },
            {
              name: "confirmPassword",
              label: "Confirm Password",
              show: showConfirmPassword,
              setShow: setShowConfirmPassword,
            },
          ].map(({ name, label, show, setShow }) => (
            <div key={name} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <input
                type={show ? "text" : "password"}
                name={name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#30ac57] focus:ring-2 focus:ring-[#30ac57]/30 transition"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-11 text-gray-500"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Submit */}
          <div className="md:col-span-2 text-center mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#30ac57] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#28a14e] transition"
            >
              Register as Seller
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default SellWithUs;

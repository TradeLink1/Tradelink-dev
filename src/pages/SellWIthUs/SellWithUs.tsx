import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";

// Benefits Data
const benefits = [
  {
    icon: <IoIosPeople size={40} className="text-[#f89216]" />,
    title: "Reach More Customers",
    text: "Expand your business reach by showcasing your products and services online.",
  },
  {
    icon: <MdManageAccounts size={40} className="text-[#f89216]" />,
    title: "Easy to Manage",
    text: "Manage listings, track messages, and update products easily in your dashboard.",
  },
  {
    icon: <TbBulb size={40} className="text-[#f89216]" />,
    title: "Build Your Brand",
    text: "Showcase your business professionally and stand out from competitors.",
  },
];

const SellWithUs: React.FC = () => {
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
    logo: null as File | null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Seller Registration Data:", formData);
      alert("Seller registered successfully!");
      localStorage.setItem("sellerLoggedIn", "true");
      navigate("/dashboard");
    }
  };

  return (
    <section className="max-w-[1150px] justify-center mt-20 mx-auto px-6">
      {/* Hero */}
      <motion.div
        className="flex flex-row flex-wrap justify-between pt-15 items-center "
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="text-4xl w-[310px] mb-4 md:text-5xl max-mobile:text-3xl  font-bold text-gray-800 leading-tight ">
            Start Selling on <span className="text-[#f89216]">TradeLink</span>
          </h1>
          <p className="text-lg text-[#333333] w-[320px] mb-6">
            Join thousands of sellers connecting with more customers daily.
          </p>
          <a href="#register-form">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#30ac57] text-white mb-10 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#28a14d] transition"
            >
              Start Selling Now
            </motion.button>
          </a>
        </div>
        <motion.img
          src="/buyer1.png"
          alt="Sell Illustration"
          className="max-w-[370px] max-tablet:max-w-[370px] max-[3400px]:max-w-[500px] max-mobile:max-w-[320px] rounded-4xl mt-4 "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        />
      </motion.div>

      {/* Benefits */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 my-12">
        {benefits.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl mt-8 transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Registration Form */}
      <motion.section
        id="register-form"
        className="bg-white rounded-3xl shadow-lg p-10 my-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl  md:text-4xl font-bold text-center text-gray-800 mb-8">
          Seller Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          {[
            { name: "businessName", label: "Business Name", type: "text" },
            { name: "ownerName", label: "Owner Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-2">
                {label}
              </label>
              <input
                type={type}
                name={name}
                className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-[#30ac57] outline-none"
                onChange={handleChange}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Selects */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Business Level
            </label>
            <select
              name="businessLevel"
              className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-[#30ac57] outline-none"
              onChange={handleChange}
            >
              <option value="">-- Select Level --</option>
              <option value="individual">Individual Seller</option>
              <option value="small">Small Business</option>
              <option value="enterprise">Large Enterprise</option>
            </select>
            {errors.businessLevel && (
              <p className="text-red-500 text-sm">{errors.businessLevel}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-[#30ac57] outline-none"
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              <option value="products">Products</option>
              <option value="services">Services</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Business Address
            </label>
            <input
              type="text"
              name="address"
              className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-[#30ac57] outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Business Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-[#30ac57] outline-none"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Upload Logo */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Store Logo
            </label>
            <div className="flex items-center gap-3 border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-[#30ac57] transition">
              <FaUpload className="text-[#30ac57]" />
              <input
                type="file"
                name="logo"
                accept="image/*"
                className="w-full cursor-pointer outline-none"
                onChange={handleChange}
              />
            </div>
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
              <label className="block text-gray-700 font-medium mb-2">
                {label}
              </label>
              <input
                type={show ? "text" : "password"}
                name={name}
                className="border rounded-xl w-full p-3 focus:ring-2 focus:ring-[#30ac57] outline-none"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-12 text-gray-600"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#f89216] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#30ac57] transition mt-6"
            >
              Register as Seller
            </motion.button>
          </div>
        </form>
      </motion.section>
    </section>
  );
};

export default SellWithUs;

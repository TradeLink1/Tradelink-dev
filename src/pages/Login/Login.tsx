import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { motion } from "framer-motion"; // Import Framer Motion

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <section
      id="loginbg"
      className="bg-[#f89216] min-h-screen flex flex-col items-center justify-center"
    >
      <div>
        {/* Go Back Button */}
        <motion.button
          onClick={handleGoBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-[14px] text-[#333333] font-normal hover:text-[#ffffff] hover:rounded-full hover:bg-[#30ac57] py-2 px-4 mb-6"
        >
          <FaArrowLeft />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-max w-[400px] max-mobile:w-[335px] bg-white rounded-[30px] shadow-md p-7"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-[#333333]">
            Welcome Back <span className="wave">👋</span>
          </h2>
          <p className="text-[14px] mb-3 text-center text-[#333333]">
            Sign in to your TradeLink account
          </p>

          {/* Role Switch */}
          <div className="flex justify-between w-max p-0.5 bg-[#f9eac5] border border-[#FEF6E1] mx-auto rounded-full mb-6">
            <button
              onClick={() => setRole("buyer")}
              className={`px-9 py-2 rounded-full text-sm ${
                role === "buyer"
                  ? "bg-[#F89216] text-white"
                  : "hover:bg-[#F89216]/30"
              }`}
            >
              I’m a buyer
            </button>
            <button
              onClick={() => setRole("seller")}
              className={`px-9 py-2 rounded-full text-sm ${
                role === "seller"
                  ? "bg-[#F89216] text-white"
                  : "hover:bg-[#F89216]/30"
              }`}
            >
              I’m a seller
            </button>
          </div>

          {/* Email */}
          <div className="mb-4 text-left">
            <label className="block text-sm mb-1 text-[#333333]">
              Email Address
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 pl-10 focus:ring-[#F89216] placeholder:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 text-left">
            <label className="block text-sm mb-1 text-[#333333]">
              Password
            </label>
            <div className="relative">
              <GoLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pl-10 placeholder:text-sm border rounded-full pr-10 outline-none focus:ring-2 focus:ring-[#F89216]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#F89216]" />
              Remember me
            </label>
            <button className="text-[#F89216] hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button with Motion */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#50ac57" }}
            whileTap={{ scale: 0.95 }}
            className="px-20 mx-auto flex bg-[#333333] text-white py-3 rounded-full text-sm font-medium"
          >
            Sign In
          </motion.button>

          {/* Conditional Bottom Text */}
          <div className="text-center mt-4 text-sm">
            {role === "buyer" ? (
              <p>
                Don’t have an account?{" "}
                <Link
                  to="/Signup"
                  className="text-[#F89216] font-medium hover:underline"
                >
                  Signup
                </Link>
              </p>
            ) : (
              <p>
                New to selling?{" "}
                <Link
                  to="/SellerForm"
                  className="text-[#F89216] font-medium hover:underline"
                >
                  Join as a seller
                </Link>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;

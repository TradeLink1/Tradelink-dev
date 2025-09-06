import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoArrowBackSharp,
  IoLockClosed,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios2";
import Swal from "sweetalert2";

// Define the form data type
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const password = watch("password", "");

  // ✅ SweetAlert2 Toast config
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  // ✅ Submit handler
  const onSubmit = async (data: UserData) => {
    try {
      setLoading(true);

      // Combine first + last name into a single "name"
      const payload = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        password: data.password,
      };

      await api.post("api/v1/auth/register", payload);

      // ✅ Show success toast
      Toast.fire({
        icon: "success",
        title: "Account created successfully 🎉",
        
      });

      Swal.fire({
  toast: true,
  icon: "success",
  title: "Registration successful! Please check your email to verify your account.",
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
});

      // redirect after short delay
      setTimeout(() => navigate("/login"), 1200);

    } catch (error: any) {
      // ✅ Show error toast
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Registration failed ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <motion.div
      className="bg-[#f89216] min-h-screen flex items-center justify-center py-20 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-[500px] w-full mx-auto p-4"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center max-w-fit align-center justify-center text-[#333333] hover:bg-[#50ac57] hover:rounded-full hover:text-white py-2 px-4 rounded-md transition-colors mb-4"
        >
          <IoArrowBackSharp className="mr-2" />
          <span className="font-semibold text-[14px]">Back to Home</span>
        </button>

        <motion.div
          className="bg-[#FFFFFF] h-max w-[450px] max-mobile:w-[335px] mx-auto p-8 min-h-fit rounded-[30px] shadow-md border border-gray-200"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold flex items-center justify-center text-[#F89216]">
            Join TradeLink
          </h1>
          <p className="flex items-center justify-center text-gray-600 mb-6 text-center">
            Create your buyer account to start shopping locally
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First + Last name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className={`mt-1 block w-full pl-3 pr-3 py-3 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className={`mt-1 block w-full pl-3 pr-3 py-3 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  {...register("lastName", { required: "Last name is required" })}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                />
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Must be at least 8 characters long" },
                  })}
                />
                <IoLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer p-1"
                >
                  {showPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } rounded-full focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                <IoLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer p-1"
                >
                  {showConfirmPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 text-[#F89216] focus:ring-[#F89216] border-gray-300 rounded"
                aria-invalid={errors.terms ? "true" : "false"}
                {...register("terms", { required: "You must agree to the terms and privacy policy" })}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 leading-tight">
                I agree to the{" "}
                <a href="/terms-of-service" className="text-[#F89216] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-[#F89216] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}

            {/* Submit */}
            <div className="w-max mx-auto flex justify-center">
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? "bg-gray-400" : "bg-[#333333]"} text-white font-bold py-3 px-20 rounded-full hover:bg-[#30AC57] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
              >
                {loading ? "Creating..." : "Create Account"}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#F89216] hover:underline">
                Sign in
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              Want to sell instead?{" "}
              <Link to="/sellwithus" className="text-[#F89216] hover:underline">
                Join as Seller
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;

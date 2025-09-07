import type React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import api from "../../api/axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  Resend Verification State
  const [showResendModal, setShowResendModal] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  //  Show modal if user just verified email via link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verified = params.get("verified");

    if (verified === "true") {
      Swal.fire({
        icon: "success",
        title: "Email Verified!",
        text: "Your email has been successfully verified. You can now login.",
        confirmButtonColor: "#F89216",
      });

      window.history.replaceState({}, document.title, "/login");
    }
  }, []);

  //  Login Handler
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Signing in...",
      text: "Please wait while we log you in",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await api.post("api/v1/auth/login", {
        email,
        password,
      });

      const { token, role: backendRole, userId, sellerId, name } = res.data;

      //  Store everything in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", backendRole);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userId,
          sellerId,
          name,
          role: backendRole,
          token,
        })
      );

      Swal.close();
      Toast.fire({
        icon: "success",
        title: "Login successful 🎉",
      });

      //  Redirect based on role
      if (backendRole === "seller") {
        navigate("/dashboard");
      } else {
        navigate("/"); // buyers go home
      }
    } catch (err: any) {
      Swal.close();
      Toast.fire({
        icon: "error",
        title: err.response?.data?.message || "Invalid email or password",
      });
    }
  };

  //  Forgot Password Modal
  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Forgot Password",
      text: "Enter your email address to receive a password reset link",
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
      confirmButtonColor: "#F89216",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter your email address";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
      },
    });

    if (email) {
      Swal.fire({
        title: "Sending reset link...",
        text: "Please wait while we send the reset link to your email",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await api.post("api/v1/auth/forgot-password", {
          email,
        });

        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Reset Link Sent!",
          text: "Please check your email for the password reset link",
          confirmButtonColor: "#F89216",
        });
      } catch (error: any) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to send reset link. Please try again.",
          confirmButtonColor: "#F89216",
        });
      }
    }
  };

  //  Resend Verification Handlers
  const handleResendVerification = () => {
    setShowResendModal(true);
    setResendEmail(email); // default to current email if typed
  };

  const handleResendSubmit = async (e: any) => {
    e.preventDefault();

    if (!resendEmail.trim()) {
      return Swal.fire("Error", "Please enter your email address", "error");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resendEmail)) {
      return Swal.fire("Error", "Please enter a valid email address", "error");
    }

    try {
      setResendLoading(true);

      await api.post("/api/v1/auth/resend-verification", {
        email: resendEmail,
      });

      Swal.fire({
        icon: "success",
        title: "Email Sent 📧",
        text: "Verification link has been resent to your email.",
        confirmButtonColor: "#30ac57",
      });

      setShowResendModal(false);
      setResendEmail("");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Failed to resend verification email",
      });
    } finally {
      setResendLoading(false);
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

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4 text-left">
              <label className="block text-sm mb-1 text-[#333333]">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 pl-10 focus:ring-[#F89216] placeholder:text-sm"
                  placeholder="Enter your email"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 placeholder:text-sm border rounded-full pr-10 outline-none focus:ring-2 focus:ring-[#F89216]"
                  placeholder="Enter your password"
                  required
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
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#F89216] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#50ac57" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-20 mx-auto flex bg-[#333333] text-white py-3 rounded-full text-sm font-medium"
            >
              Sign In
            </motion.button>

            {/*  Resend Verification Button */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Didn't get the verification email?{" "}
              <button
                type="button"
                onClick={handleResendVerification}
                className="text-[#30ac57] font-semibold hover:underline"
              >
                Resend Verification
              </button>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Resend Modal */}
      {showResendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">
              Resend Verification Email
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address to receive a new verification link.
            </p>

            <form onSubmit={handleResendSubmit}>
              <div className="mb-6">
                <label className="block font-medium mb-2 text-[#333333]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowResendModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={resendLoading}
                  className="flex-1 bg-[#30ac57] text-white py-3 rounded-full font-semibold hover:bg-[#2a9b4f] transition-all disabled:opacity-50"
                >
                  {resendLoading ? "Sending..." : "Send Email"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Login;

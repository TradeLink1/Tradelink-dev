import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

import hero1 from "../../../assets/images/hero-images/hero1.jpeg";
import hero2 from "../../../assets/images/hero-images/hero2.jpg";
import hero3 from "../../../assets/images/hero-images/hero3.png";
import hero4 from "../../../assets/images/hero-images/hero4.jpg";
import hero5 from "../../../assets/images/hero-images/hero5.png";
import hero6 from "../../../assets/images/hero-images/hero6.jpg";
import hero7 from "../../../assets/images/hero-images/hero7.png";
import hero8 from "../../../assets/images/hero-images/hero8.jpeg";
import hero9 from "../../../assets/images/hero-images/hero9.jpg";
import hero10 from "../../../assets/images/hero-images/hero10.jpeg";

const slides = [
  {
    image: hero1,
    title: "Connecting you to trusted sellers, artisans & local businesses",
  },
  {
    image: hero2,
    title: "Bringing local markets to your fingertips, one vendor at a time",
  },
  {
    image: hero3,
    title: "Where your next trusted artisan is just a click away.",
  },
  {
    image: hero4,
    title: "Helping you discover everyday sellers doing extraordinary work.",
  },
  {
    image: hero5,
    title: "From market stalls to your screen - TradeLink connects you.",
  },
  {
    image: hero6,
    title: "Empowering sellers. Serving buyers. Building communities.",
  },
  {
    image: hero7,
    title:
      "Find the service you need — from the people who live right around you.",
  },
  { image: hero8, title: "Real people. Real businesses. Real connections." },
  {
    image: hero9,
    title: "Discover, connect, and support the hands behind the hustle.",
  },
  {
    image: hero10,
    title: "Shop smart. Support local. TradeLink is your marketplace.",
  },
];

const HeroSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goToNextSlide = () =>
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const goToPreviousSlide = () =>
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!query.trim()) setResults([]);
  }, [query]);

  const triggerSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.get("/api/v1/sellers/search", {
        params: { query },
      });
      const sellers = res?.data?.sellers || [];
      setResults(sellers);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative max-w-[1180px] mx-auto mt-50 rounded-[100px] h-[620px] overflow-hidden max-tablet:max-h-[500px] max-tablet:max-w-[750px] max-mobile:w-[340px] max-mobile:h-[300px] max-mobile:rounded-[65px] max-[510px]:h-[400px] max-[50px]:max-w-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <img
              src={slides[currentSlideIndex].image}
              alt={`Slide ${currentSlideIndex}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[#011229b4] z-10" />

        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4">
          <motion.h1
            key={currentSlideIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[60px] max-w-[800px] leading-16 font-bold mb-8 max-tablet:text-[43px] max-tablet:leading-12 max-mobile:text-[29px] max-mobile:w-[280px] max-mobile:leading-8 max-[510px]:text-[37px] max-[510px]:w-[380px] max-tablet:w-[420px]"
          >
            {slides[currentSlideIndex].title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-between gap-3 max-[510px]:text-[14px]"
          >
            <div className="rounded-l-full relative flex items-center bg-white overflow-hidden">
              <FiSearch className="absolute left-5 top-5 text-[#30ac57] max-mobile:top-3 max-mobile:left-7 max-mobile:text-[10px] max-[510px]:top-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
                placeholder="Search for sellers, artisans..."
                className="px-45 py-4 text-left text-[#424242] outline-none max-tablet:px-10 max-tablet:py-2 max-mobile:max-w-[150px] max-mobile:h-[10px] max-mobile:text-[8px]"
              />
            </div>
            <button
              onClick={triggerSearch}
              disabled={loading}
              className="bg-[#30ac57] rounded-r-full px-6 py-4 text-white hover:bg-[#16903d] transition-colors duration-300 max-mobile:px-3 max-mobile:py-2 max-mobile:text-[12px] max-[510px]:text-[10px] disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </motion.div>
        </div>

        <button
          onClick={goToPreviousSlide}
          className="absolute left-5 max-mobile:left-2 top-1/2 transform -translate-y-1/2 text-[#f89216] hover:text-[#30ac57] text-5xl z-30 max-mobile:text-4xl max-[510px]:text-[40px] max-[510px]:left-3"
        >
          <IoIosArrowDropleftCircle />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-5 max-mobile:right-2 top-1/2 transform -translate-y-1/2 text-[#f89216] hover:text-[#30ac57] text-5xl z-30 max-mobile:text-4xl max-[510px]:text-[40px] max-[510px]:right-3"
        >
          <IoIosArrowDroprightCircle />
        </button>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-[10] max-tablet:bottom-14 max-mobile:bottom-8 max-[510px]:bottom-9">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`py-1.5 px-1.5 rounded-full cursor-pointer transition-all duration-300 max-mobile:py-1 max-mobile:px-1 max-[510px]:px-1 max-[510px]:py-1 ${
                index === currentSlideIndex
                  ? "bg-[#F89216] scale-125"
                  : "bg-white/40"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </section>

      {query && (
        <div className="max-w-[1180px] mx-auto mt-10 px-4">
          {loading ? (
            <p className="text-center text-gray-500">Searching...</p>
          ) : results.length === 0 ? (
            <p className="text-center text-gray-500">
              No sellers found for "
              <span className="font-semibold">{query}</span>"
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((seller, index) => (
                <div
                  key={seller._id ?? index}
                  onClick={() => {
                    if (!seller._id) return;
                    navigate(`/seller-profile/${seller._id}`);
                  }}
                  className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={seller.storeLogo || "/default-logo.png"}
                    alt={seller.storeName || "Seller Logo"}
                    className="w-16 h-16 object-cover rounded-full mb-3"
                  />
                  <h3 className="font-bold text-lg text-gray-900">
                    {seller.storeName}
                  </h3>
                  <p className="text-gray-600">{seller.businessCategory}</p>
                  <p className="text-gray-500 text-sm">
                    {seller.location?.city}, {seller.location?.state}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroSection;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
import { useSearch } from "../../../context/SearchContext";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const slides = [
  {
    image: hero1,
    title: `"Connecting you to trusted sellers, artisans & local businesses"`,
  },
  {
    image: hero2,
    title: `"Bringing local markets to your fingertips, one vendor at a time"`,
  },
  {
    image: hero3,
    title: `“Where your next trusted artisan is just a click away.”`,
  },
  {
    image: hero4,
    title: `“Helping you discover everyday sellers doing extraordinary work.”`,
  },
  {
    image: hero5,
    title: `“From market stalls to your screen - TradeLink connects you.”`,
  },
  {
    image: hero6,
    title: `“Empowering sellers. Serving buyers. Building communities.”`,
  },
  {
    image: hero7,
    title: `“Find the service you need — from the people who live right around you.”`,
  },
  { image: hero8, title: `“Real people. Real businesses. Real connections.”` },
  {
    image: hero9,
    title: `“Discover, connect, and support the hands behind the hustle.”`,
  },
  {
    image: hero10,
    title: `“Shop smart. Support local. TradeLink is your marketplace.”`,
  },
];

const HeroSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { query, setQuery } = useSearch();

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const triggerSearch = () => {
    if (query.trim()) {
      console.log("Search triggered:", query);
    } else {
      console.log("Search query is empty.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 4000); // faster switch
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative max-w-[1200px] mx-auto mt-45 rounded-[100px] h-[650px] overflow-hidden max-tablet:max-h-[500px] max-tablet:max-w-[700px] max-mobile:w-[340px] max-mobile:h-[300px] max-mobile:rounded-[65px] max-[510px]:h-[400px] max-[510px]:w-[450px]">
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

      {/* overlay */}
      <div className="absolute inset-0 bg-[#011229b4] z-10" />

      {/* Text + Search */}
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
          <div>
            <button
              onClick={triggerSearch}
              className="bg-[#30ac57] rounded-r-full px-6 py-4 text-white hover:bg-[#0e6b2b] transition-colors duration-300 max-mobile:px-3 max-mobile:py-2 max-mobile:text-[12px] max-[510px]:text-[10px]"
            >
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Bottom Dots */}
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
  );
};

export default HeroSection;

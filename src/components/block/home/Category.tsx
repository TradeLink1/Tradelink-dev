import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import cat1 from "../../../assets/images/categories-images/cat1.png";
import cat2 from "../../../assets/images/categories-images/cat2.png";
import cat3 from "../../../assets/images/categories-images/cat3.png";
import cat4 from "../../../assets/images/categories-images/cat4.png";
import cat5 from "../../../assets/images/categories-images/cat5.png";
import cat6 from "../../../assets/images/categories-images/cat6.png";
import cat7 from "../../../assets/images/categories-images/cat7.png";
import cat8 from "../../../assets/images/categories-images/cat8.png";
import cat9 from "../../../assets/images/categories-images/cat9.png";

import Button from "../../reusable/Button";
import {
  PiArrowBendDownRightBold,
  PiArrowBendDownLeftBold,
} from "react-icons/pi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const sellerCategories = [
  {
    title: "Market Men & Women",
    image: cat1,
    description:
      "From street stalls to open markets – TradeLink brings their fresh goods closer to you.",
  },
  {
    title: "Product Vendors",
    image: cat2,
    description:
      "Groceries, snacks, drinks & more — TradeLink connects you with everyday vendors.",
  },
  {
    title: "Clothing & Fashion Sellers",
    image: cat3,
    description:
      "Native wear, ready-made fashion & accessories — easily discoverable on TradeLink.",
  },
  {
    title: "Artisans & Skilled Workers",
    image: cat4,
    description:
      "Shoemakers, welders, carpenters — TradeLink links buyers with trusted artisans.",
  },
  {
    title: "Caterers & Food Sellers",
    image: cat5,
    description:
      "Party trays, home meals, snacks — TradeLink connects you to local kitchens.",
  },
  {
    title: "Hair & Beauty Professionals",
    image: cat6,
    description:
      "Discover nearby braiders, stylists, and MUA experts — all on TradeLink.",
  },
  {
    title: "Household Essentials Sellers",
    image: cat7,
    description:
      "Need a new mop or basin? Find household basics from real vendors on TradeLink.",
  },
  {
    title: "Building Materials Dealers",
    image: cat8,
    description:
      "From cement to ceiling boards — TradeLink connects builders with local suppliers.",
  },
  {
    title: "Furniture & Home-ware Sellers",
    image: cat9,
    description:
      "Discover handmade chairs, beds & cabinets from local makers on TradeLink.",
  },
];

const Category = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  // --- Drag to scroll (desktop) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };
  const handleMouseLeave = () => {
    if (!scrollRef.current) return;
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };
  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- Scroll progress tracker ---
  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;

    const handleScroll = () => {
      const scrolled = box.scrollLeft / (box.scrollWidth - box.clientWidth);
      setProgress(scrolled);
    };

    box.addEventListener("scroll", handleScroll);
    return () => box.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Arrow controls ---
  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <motion.section
      className="bg-[#f89216] pt-22 pb-24 mt-30 relative"
      id="categories"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex flex-col justify-center text-center max-w-[1200px] mx-auto px-4">
        <motion.h1
          className="text-[42px] max-[510px]:text-[35px] text-[#fef6e1] font-bold max-mobile:text-[25px]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Categories
        </motion.h1>
        <motion.p
          className="text-[23px] max-tablet:text-[20px] font-medium max-w-[600px] leading-8 mx-auto text-[#333333] max-mobile:text-[17px] max-mobile:max-w-[350px] max-mobile:leading-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          "Meet the people behind the services — TradeLink connects you to real
          sellers in your area."
        </motion.p>
      </div>

      {/* Arrows */}
      <button
        onClick={() => scrollByAmount(-300)}
        className="hidden md:flex absolute left-20 max-tablet:left-4 top-1/2 -translate-y-1/2 z-10 
                   bg-white/30 backdrop-blur-md rounded-full p-3 shadow-md
                   hover:bg-white/50 transition"
      >
        <IoIosArrowBack size={24} className="text-black" />
      </button>
      <button
        onClick={() => scrollByAmount(300)}
        className="hidden md:flex absolute right-20 max-tablet:right-4 top-1/2 -translate-y-1/2 z-10 
                   bg-white/30 backdrop-blur-md rounded-full p-3 shadow-md
                   hover:bg-white/50 transition"
      >
        <IoIosArrowForward size={24} className="text-black" />
      </button>

      {/* Scrollable categories row */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="mt-10 max-w-[1200px] mx-auto flex flex-row overflow-x-auto space-x-5 px-4 
                   scrollbar-hide scroll-smooth touch-pan-x cursor-grab select-none
                   [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {sellerCategories.map((item, index) => (
          <motion.div
            id="bounce-soft"
            key={index}
            className="flex-shrink-0 mb-13 bg-[#30ac57] hover:border-1 hover:border-[#5e5e5e] 
                       px-6 py-5 rounded-3xl transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <h1 className="mb-3 font-semibold text-[20px] max-mobile:text-[18px] text-[#fef6e1]">
              {item.title}
            </h1>
            <div className="rounded-2xl overflow-hidden h-[180px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[14px] max-w-[300px] max-mobile:text-[12px] bg-[#ffffff] border-1 border-[#f89216] p-3 rounded-2xl text-[#333333] mt-3 leading-4">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Scroll progress bar */}
      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#30ac57] transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Bottom buttons */}
      <motion.div
        className="text-center mt-13 max-w-[1280px] mx-auto px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div>
          <h1 className="text-[42px] max-[510px]:text-[35px] text-[#fef6e1] font-bold max-mobile:text-[25px]">
            Connect with Local Sellers{" "}
          </h1>
          <p className="text-[23px] max-tablet:text-[20px] font-medium max-w-[900px] leading-6 mx-auto text-[#333333] max-mobile:text-[17px]">
            Discover amazing products and services from trusted local businesses
            in your community. Support local commerce while finding exactly what
            you need.
          </p>
        </div>

        <div className="mt-8 gap-4 flex justify-center items-center max-mobile:flex-col">
          <PiArrowBendDownRightBold
            id="beat"
            className="max-mobile:rotate-90"
            size={30}
            color="#fef6e1"
          />
          <Link to="/Categories/Products">
            <Button
              name="Shop Products"
              bgColor="#333333"
              hoverBgColor="#30ac57"
              hoverTextColor="white"
              textColor="white"
            />
          </Link>
          <Link to="/Categories/Services">
            <Button
              name="Find Services"
              bgColor="#30ac57"
              hoverBgColor="white"
              hoverTextColor="#333333"
              textColor="white"
            />
          </Link>
          <PiArrowBendDownLeftBold
            id="beat"
            className="max-mobile:rotate-90"
            size={30}
            color="#333333"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Category;

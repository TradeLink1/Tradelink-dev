import { motion } from "framer-motion";
import Icon1 from "../../../assets/images/icons/icon1.png";
import Icon2 from "../../../assets/images/icons/icon2.png";
import Icon3 from "../../../assets/images/icons/icon3.png";

type Card = {
  icon: string;
  title: string;
  description: string;
};

const cardData: Card[] = [
  {
    icon: Icon1,
    title: "Discover Local Sellers",
    description:
      "Search for sellers near you by category or location - from market women to artisans and vendors.",
  },
  {
    icon: Icon2,
    title: "Connect & Explore their Offers",
    description:
      "View their profile, listen to seller voice notes, read reviews, or message them directly.",
  },
  {
    icon: Icon3,
    title: "Buy, Visit, or Patronize",
    description:
      "Call, message, or visit the seller - TradeLink connects you directly without middlemen.",
  },
];

const HowTLworks = () => {
  return (
    <section className="pt-25 pb-25">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex max-w-[1200px] mx-auto items-center justify-center mb-10 text-center"
      >
        <h1 className="text-[42px] text-[#333333] font-bold max-[510px]:text-[35px] max-mobile:text-[25px]">
          How TradeLinks Works
        </h1>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-12 max-w-[1280px] mx-auto px-4">
        {Array.isArray(cardData) &&
          cardData.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.15,
              }}
              whileHover={{
                y: -6,
                scale: 1.05,
                rotate: 0.2,
                transition: { duration: 0.25 },
              }}
              whileTap={{ scale: 0.98 }}
              className="w-[320px] p-8 bg-white rounded-3xl shadow-md cursor-pointer hover:shadow-lg"
            >
              <motion.img
                src={card.icon}
                alt={card.title}
                className="h-[100px] mb-4"
                initial={{ opacity: 0, rotate: -8, y: 10 }}
                whileInView={{ opacity: 1, rotate: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                  delay: index * 0.15 + 0.1,
                }}
              />
              <h1 className="text-[25px] leading-7 mb-3 font-semibold text-[#333333] max-mobile:text-[20px]">
                {card.title}
              </h1>
              <p className="text-[#555] max-mobile:text-[14px]">
                {card.description}
              </p>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default HowTLworks;

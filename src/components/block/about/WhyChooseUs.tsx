import Icon4 from "../../../assets/images/icons/icon4.png";
import Icon5 from "../../../assets/images/icons/icon5.png";
import Icon6 from "../../../assets/images/icons/icon6.png";
import { motion } from "framer-motion";

const cardData = [
  {
    icon: Icon4,
    title: " Local Businesses ",
    description:
      "Support your community by shopping with verified local sellers.",
  },
  {
    icon: Icon5,
    title: "Trusted Reviews",
    description: "Read honest reviews from real customers in your area.",
  },
  {
    icon: Icon6,
    title: "Easy to Use",
    description: "Simple interface to find what you need or grow your business",
  },
];

const WhyChooseUs = () => {
  return (
    <div>
      <section id="whysection" className=" pb-25 pt-20 bg-[#f89216] ">
        <div className=" mb-10 text-center ">
          <h1 className="text-[35px] text-[#fef6e1] font-bold max-[510px]:text-[30px] max-mobile:text-[25px]">
            Why Choose TradeLink?
          </h1>
        </div>
        <div className=" rounded-4xl flex max-w-[1200px] mx-auto items-center justify-center">
          <div className="flex flex-wrap justify-center gap-12 max-w-[1280px] mx-auto px-4">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-[300px] p-8 bg-white rounded-3xl transform hover:border-1 hover:border-[#5e5e5e] hover:scale-105 hover:shadow-lg transition duration-300"
              >
                <img
                  className="h-[55px] mb-4 border-1 bg-[#f89216] p-2 rounded-full"
                  src={card.icon}
                  alt={card.title}
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
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;

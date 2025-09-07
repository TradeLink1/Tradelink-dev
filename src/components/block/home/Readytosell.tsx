import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../reusable/Button";
import {
  PiArrowBendDownLeftBold,
  PiArrowBendDownRightBold,
} from "react-icons/pi";

const Readytosell = () => {
  return (
    <section id="readybg" className="bg-[#30ac57]">
      <div className="flex max-w-[1200px] mx-auto flex-col items-center justify-center text-center px-4 py-16">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[42px] max-[510px]:text-[35px] text-[#fef6e1] font-bold max-mobile:text-[25px]"
        >
          Ready to Start Selling?
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[23px] mb-7 max-tablet:text-[20px] font-medium max-w-[600px] leading-8 mx-auto text-[#ffffff] max-mobile:text-[17px] max-mobile:max-w-[350px] max-mobile:leading-6"
        >
          Join thousands of local businesses already using TradeLink to grow
          their customer base.
        </motion.p>

        {/* Button + Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-3"
        >
          {/* Top Arrow */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <PiArrowBendDownRightBold
              className="rotate-90"
              size={30}
              color="#333333"
            />
          </motion.div>

          {/* Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/SellWithUs">
              <Button
                name="Become a Seller"
                bgColor="#ffffff"
                hoverBgColor="#333333"
                hoverTextColor="#ffffff"
                textColor="#333333"
              />
            </Link>
          </motion.div>

          {/* Bottom Arrow */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <PiArrowBendDownLeftBold
              className="rotate-90"
              size={30}
              color="#333333"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Readytosell;

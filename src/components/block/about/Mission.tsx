import { Target } from "lucide-react";
import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section className="w-full bg-[#fef6e1] pt-25 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-white rounded-[30px] p-8 hover:shadow-xl border-1 border-[#F89216] transition"
      >
        <div className="flex items-center gap-3 mb-4 ">
          <Target className="w-8 h-8 text-[#F89216]" />
          <h3 className="text-[35px]  text-[#333333] font-bold max-[510px]:text-[30px] max-mobile:text-[25px]">
            Our Mission
          </h3>
        </div>
        <p className="text-[#333333]  max-mobile:text-[15px] text-[18px]">
          To simplify the trading experience by creating a reliable platform
          that empowers people and businesses to connect, discover
          opportunities, and thrive.
        </p>
      </motion.div>
    </section>
  );
}

import { Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section className="w-full bg-[#fef6e1] pt-5 pb-25 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto border-1 border-[#F89216] bg-white rounded-[30px] p-8 hover:shadow-xl transition"
      >
        <div className="flex  items-center gap-3 mb-4">
          <Eye className="w-8 h-8 text-[#F89216]" />
          <h3 className="text-[35px] text-[#333333] font-bold max-[510px]:text-[30px] max-mobile:text-[25px]">
            Our Vision
          </h3>
        </div>
        <p className="text-[#333333] max-mobile:text-[15px] text-[18px]">
          To become the leading digital hub for trade in Africa and beyond,
          where opportunities are limitless, and every transaction builds trust
          and growth.
        </p>
      </motion.div>
    </section>
  );
}

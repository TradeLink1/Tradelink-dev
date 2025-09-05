import { motion } from "framer-motion";

export default function AboutHeader() {
  return (
    <section
      id="aboutbg"
      className=" bg-[#F89216] pt-50 pb-40 py-16 px-6 md:px-12 lg:px-24  "
    >
      <div className=" max-w-[1200px] mx-auto max-tablet:flex-col flex items-center">
        {/* Left Side Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-[45px] typing-text max-tablet:text-center text-[#fef6e1]  font-bold max-[510px]:text-[35px] max-mobile:text-[25px]">
            About <span className="text-[#333333]">Tradelink</span>
          </h2>
          <p className="text-[20px] mb-10 max-tablet:text-[20px] font-medium max-w-[450px] max-tablet:max-w-[550px] max-tablet:text-center  leading-8  text-[#ffffff] max-mobile:text-[17px] max-mobile:max-w-[350px] max-mobile:leading-6 mx-auto">
            We are building a smarter way for people to connect, trade, and
            grow. Our platform makes trading simple, secure, and seamless.
          </p>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          className=" mx-auto max-w-[600px]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            id="bounce-soft"
            className="rounded-[40px]"
            src="./about1.png"
            alt="About Tradelink"
          />
        </motion.div>
      </div>
    </section>
  );
}

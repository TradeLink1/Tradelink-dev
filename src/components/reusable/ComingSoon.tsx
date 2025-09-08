import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import logo from "/icon.png";

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon = ({ pageName }: ComingSoonProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F89216] to-[#30ac57] p-6 relative">
      <motion.div
        className="text-center bg-white p-8 rounded-2xl shadow-lg z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center mb-6">
          <motion.img
            src={logo}
            alt="TradeLink Logo"
            className="w-20 h-20 object-contain mr-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <span className="text-3xl font-bold text-[#006096]">Tradelink</span>
        </div>
        <motion.div
          className="mx-auto mb-6 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Clock
            size={60}
            className="text-[#F89216] animate-pulse"
            strokeWidth={2}
          />
        </motion.div>
        <div className="relative flex items-center justify-center">
          <motion.span
            className="text-[12vw] sm:text-[6vw] md:text-[9vw] lg:text-[10vw] text-gray-300 font-extralight absolute left-[-5%] -translate-y-1/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0, 1, 0], x: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            &lt;
          </motion.span>
          <h1 className="text-4xl font-bold text-[#333333] mb-4">
            Coming Soon
          </h1>
          <motion.span
            className="text-[12vw] sm:text-[6vw] md:text-[9vw] lg:text-[10vw] text-gray-300 font-extralight absolute right-[-5%] -translate-y-1/5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: [0, 1, 0], x: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            &gt;
          </motion.span>
        </div>
        <p className="text-xl text-gray-700 mb-6">
          The <b>{pageName}</b> page is under construction! The TradeLink team
          is working hard to bring this to you. Check back soon!
        </p>
        <motion.p
          className="text-lg text-[#30ac57] cursor-pointer hover:text-[#F89216] transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          Stay tuned for updates!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;

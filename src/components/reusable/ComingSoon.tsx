import { Clock } from "lucide-react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  pageName: string;
  logoUrl?: string; // Optional prop for logo URL
}

const ComingSoon = ({
  pageName,
  logoUrl = "/tradelink-logo.png",
}: ComingSoonProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F89216] to-[#30ac57] p-6">
      <motion.div
        className="text-center bg-white p-8 rounded-2xl shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {logoUrl && (
          <motion.img
            src={logoUrl}
            alt="TradeLink Logo"
            className="mx-auto mb-6 w-24 h-24 object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, yoyo: Infinity }}
          />
        )}
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
        <h1 className="text-4xl font-bold text-[#333333] mb-4 flex items-center justify-center gap-2">
          <span className="text-3xl">&lt;</span>
          Coming Soon
          <span className="text-3xl">&gt;</span>
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          The {pageName} page is under construction! The TradeLink team is
          working hard to bring this to you. Check back soon!
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

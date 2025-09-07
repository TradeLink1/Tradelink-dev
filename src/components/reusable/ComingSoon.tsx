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
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
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

      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15rem] sm:text-[25rem] md:text-[30rem] lg:text-[40rem] text-gray-200 opacity-50 font-extralight animate-pulse">
        &lt;
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[15rem] sm:text-[25rem] md:text-[30rem] lg:text-[40rem] text-gray-200 opacity-50 font-extralight animate-pulse">
        &gt;
      </div>

      <div className="max-w-xl text-center z-10">
        {/* Main logo and title */}
        <div className="flex justify-center items-center mb-6">
          <svg
            className="w-16 h-16 text-[#006096]"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" />
          </svg>
          <span className="text-3xl font-bold ml-2 text-[#006096]">
            Tradelink
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Pardon Our Progress
        </h1>

        <p className="text-lg sm:text-xl font-medium text-gray-600 mb-8">
          The Tradelink team is working hard to bring this feature to you. We
          are building the world's best application to connect businesses and
          ensure every page is perfect for you.
        </p>

        <p className="text-sm text-gray-500">
          We appreciate your patience and can't wait to share this with you.
          Please check back soon!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;

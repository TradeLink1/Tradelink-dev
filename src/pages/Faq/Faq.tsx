import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiInfo,
  FiShoppingCart,
  FiUsers,
  FiShield,
  FiCreditCard,
  FiHelpCircle,
  FiChevronUp,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}
interface FAQCategory {
  [key: string]: FAQItem[];
}

const FaqData: FAQCategory = {
  General: [
    {
      question: "How do I sign up as a seller?",
      answer:
        "To sign up as a seller, click on 'Sell with Us' in the header, then follow our 4-step registration process. You'll need to provide your business information, contact details, upload photos, and create a secure account.",
    },
    {
      question: "What types of businesses can join TradeLink?",
      answer:
        "We welcome both product sellers (like farmers, bakers, crafters) and service providers (like plumbers, electricians, cleaners). Any local business that serves the community can join our marketplace.",
    },
    {
      question: "Is there a fee to list my business?",
      answer:
        "Basic business listings are completely free. We only charge a small commission when you complete a sale through our platform. There are no upfront costs or monthly fees.",
    },
    {
      question: "How do buyers find my business?",
      answer:
        "Buyers can find your business through our search function, category browsing, location filters, and ratings. Make sure to complete your profile with good photos and detailed descriptions to improve visibility.",
    },
  ],
  Seller: [
    {
      question: "How do I add products or services to my listing?",
      answer:
        "Once you're logged into your seller dashboard, click on 'Upload Products' and fill in the details including photos, descriptions, and pricing. You can add unlimited products or services to your listing.",
    },
    {
      question: "How do customers contact me?",
      answer:
        "Customers can contact you through our built-in messaging system or by calling the phone number you provide. All communication is tracked for your security and convenience.",
    },
    {
      question: "Can I edit my business information after registration?",
      answer:
        "Yes! You can update your business information, photos, contact details, and listings anytime through your seller dashboard under 'Settings'.",
    },
    {
      question: "How do I get more customers?",
      answer:
        "To attract more customers: maintain a complete profile with quality photos, respond quickly to messages, encourage satisfied customers to leave reviews, and keep your listings updated with current products or services.",
    },
    {
      question: "What if I receive a negative review?",
      answer:
        "You can respond to reviews professionally to address concerns. Focus on excellent customer service to build positive reviews over time. Contact our support team if you believe a review violates our guidelines.",
    },
  ],
  Buyer: [
    {
      question: "How do I find local sellers?",
      answer:
        "Use our search bar to find specific products or services, browse by categories, or filter by location. You can also sort results by ratings, reviews, or proximity to find the best local sellers.",
    },
    {
      question: "How do I contact a seller?",
      answer:
        "On each seller's profile, you'll find options to call them directly, send a message through our platform, or book an appointment for services. Choose the method that works best for you.",
    },
    {
      question: "Are the sellers verified?",
      answer:
        "We verify seller identities and business information during registration. Look for the 'Verified' badge on seller profiles. Some service providers may also have certification badges for professional qualifications.",
    },
    {
      question: "Can I leave reviews for sellers?",
      answer:
        "Yes! After interacting with a seller, you can leave a review and rating to help other buyers make informed decisions. Your honest feedback helps maintain quality in our marketplace.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "We take privacy seriously. Your personal information is encrypted and never shared with sellers until you choose to contact them. We only share what's necessary for the transaction.",
    },
  ],
  Trust_And_Safety: [
    {
      question: "How do I ensure quality from sellers?",
      answer:
        "Check their reviews, ratings, and any uploaded certifications. You can also message sellers directly to ask questions or request photos.",
    },
    {
      question: "What should I do if I have an issue with a product?",
      answer:
        "First, contact the seller to resolve the issue. If you're unable to reach a solution, you can open a case with our support team for mediation.",
    },
    {
      question: "How is personal information and work protected",
      answer:
        "Data is encrypted, communication is secure, and artisans can safeguard their creations with clear listings and optional watermark",
    },
  ],
  Payment_And_Transactions: [
    {
      question: "How do payments work?",
      answer:
        "Payment methods vary by seller. Some accept cash, others may use digital payment platforms. Payment details are arranged directly between you and the seller for transparency and flexibility.",
    },
    {
      question: "Is there buyer protection?",
      answer:
        "While transactions occur directly between buyers and sellers, we provide a platform for communication and reviews. We recommend meeting in safe, public locations and verifying services before payment.",
    },
    {
      question: "What if I have a dispute with a seller?",
      answer:
        "First, try to resolve the issue directly with the seller through our messaging system. If you can't reach a resolution, contact our support team who can help mediate and provide guidance.",
    },
  ],

  Technical_Support: [
    {
      question: "I forgot my password. How can I reset it?",
      answer:
        "Click on 'Login' and then 'Forgot Password'. Enter your email address and we'll send you instructions to reset your password securely.",
    },
    {
      question: "Why can't I upload photos?",
      answer:
        "Make sure your images are in JPG or PNG format and under 5MB each. Clear your browser cache or try a different browser if the problem persists. Contact support if you continue having issues.",
    },
    {
      question: "The website isn't working properly on my phone.",
      answer:
        "Our website is optimized for mobile devices. Try refreshing the page, clearing your browser cache, or updating your browser. Contact us if you continue experiencing issues.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, go to Settings in your dashboard and look for 'Account Management'. You can also contact our support team for assistance with account deletion.",
    },
  ],
};

const categoryIcons = {
  General: FiInfo,
  Seller: FiShoppingCart,
  Buyer: FiUsers,
  Trust_And_Safety: FiShield,
  Payment_And_Transactions: FiCreditCard,
  Technical_Support: FiHelpCircle,
};

const categoryTitles = {
  General: "General Questions",
  Seller: "For Sellers",
  Buyer: "For Buyers",
  Trust_And_Safety: "Trust & Safety",
  Payment_And_Transactions: "Payment & Transactions",
  Technical_Support: "Technical Support",
};

function Faq() {
  const [activeCategory, setActiveCategory] = useState<string>("General");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/contact");
  };

  const toggleItem = (categoryKey: string, index: number) => {
    const itemKey = `${categoryKey}-${index}`;
    const newExpanded = new Set(expandedItems);
    newExpanded.has(itemKey)
      ? newExpanded.delete(itemKey)
      : newExpanded.add(itemKey);
    setExpandedItems(newExpanded);
  };

  const isExpanded = (categoryKey: string, index: number) =>
    expandedItems.has(`${categoryKey}-${index}`);

  const filteredFaqs = searchTerm
    ? Object.entries(FaqData).flatMap(([categoryKey, items]) =>
        items
          .filter((item) =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item, index) => ({
            ...item,
            categoryKey,
            index,
          }))
      )
    : FaqData[activeCategory]?.map((item, index) => ({
        ...item,
        categoryKey: activeCategory,
        index,
      }));

  return (
    <div className="max-w-[1200px] mt-30 mx-auto px-4 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-[42px] max-[510px]:text-[35px] text-[#333333] font-bold max-mobile:text-[25px] mb-2">
          Frequently Asked Questions{" "}
          <span className="text-[#30ac57]">(FAQs)</span>
        </h1>
        <p className="text-[20px] md:text-[23px] font-medium text-[#555] max-w-[650px] mx-auto">
          Find answers to common questions about TradeLink marketplace
        </p>
        <div className="relative max-w-md mx-auto mt-6">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-1 border-[#30ac57] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f89216] transition"
          />
        </div>
      </motion.div>

      {/* Layout */}
      <div className="grid p-8 lg:grid-cols-4 gap-8 bg-white rounded-[25px] shadow-lg border border-gray-100">
        {/* Sidebar */}
        {!searchTerm && (
          <div className="lg:col-span-1">
            <nav className="space-y-2 sticky top-8">
              {Object.keys(FaqData).map((categoryKey) => {
                const Icon =
                  categoryIcons[categoryKey as keyof typeof categoryIcons];
                const isActive = activeCategory === categoryKey;

                return (
                  <motion.button
                    key={categoryKey}
                    onClick={() => setActiveCategory(categoryKey)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#f89216] to-[#ffb347] text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">
                      {
                        categoryTitles[
                          categoryKey as keyof typeof categoryTitles
                        ]
                      }
                    </span>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        )}

        {/* FAQ Content */}
        <div className={searchTerm ? "lg:col-span-4" : "lg:col-span-3"}>
          <div className="space-y-4">
            {!searchTerm && (
              <h2 className="text-2xl font-semibold text-[#f89216] mb-6">
                {categoryTitles[activeCategory as keyof typeof categoryTitles]}
              </h2>
            )}

            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => {
                const expanded = isExpanded(item.categoryKey, item.index);

                return (
                  <motion.div
                    key={`${item.categoryKey}-${item.index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-100 mx-auto w-full rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(item.categoryKey, item.index)}
                      className="w-full max-mobile:max-w-[280px] px-4 text-left py-4  flex   hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {expanded ? (
                          <FiChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <FiChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
                        >
                          {item.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-gray-500">No results found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center"
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#fff3e5] mx-auto mb-4 shadow-inner">
          <FiHelpCircle className="text-[#f89216]" size={36} />
        </div>
        <h3 className="text-[36px] max-[510px]:text-[28px] text-[#333333] font-bold mb-3">
          Still have questions?
        </h3>
        <p className="text-[18px] md:text-[20px] text-[#555] max-w-[600px] mx-auto mb-6">
          Can't find what you're looking for? Our support team is here to help
          you get started.
        </p>
        <motion.button
          onClick={handleNavigate}
          className="bg-[#30ac57] mb-20 text-white px-8 py-3 rounded-lg font-medium hover:bg-[#333333] hover:rounded-full transition-all duration-300 shadow-md"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Contact Support
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Faq;

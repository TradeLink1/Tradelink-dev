import React from "react";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../../components/reusable/Button";
import ContactCard from "../Contact/ContactCard";
import { IoMdHelpCircle } from "react-icons/io";
import ContactForm from "./ContactForm";
import { LuClock4 } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const cards = [
    {
      icon: <FiPhone color="#F89216" size={28} />,
      title: "Phone Support",
      desc: "Speak directly with our support team",
      content: (
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <LuClock4 className="text-[#30ac57]" />
            <p>Monday - Friday 9:00 AM - 7:00 PM</p>
          </div>
          <div className="flex items-center gap-3">
            <LuClock4 className="text-[#30ac57]" />
            <p>Saturday 10:00 AM - 4:00 PM</p>
          </div>
          <div className="flex items-center gap-3">
            <LuClock4 className="text-[#30ac57]" />
            <p>Sunday Closed</p>
          </div>
          <Button
            icon={<FiPhone />}
            name="Call Now"
            bgColor="#30ac57"
            hoverBgColor="#f89216"
            hoverTextColor="#333333"
            textColor="white"
          />
        </div>
      ),
    },
    {
      icon: <MdMailOutline color="#F89216" size={28} />,
      title: "Email Support",
      desc: "Send us an email and we'll respond within 24 hours",
      content: (
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-bold">General: </span>
            <a href="mailto:support@tradelink.com" className="text-[#1f7bff]">
              support@tradelink.com
            </a>
          </p>
          <p>
            <span className="font-bold">Sellers: </span>
            <a href="mailto:sellers@tradelink.com" className="text-[#1f7bff]">
              sellers@tradelink.com
            </a>
          </p>
          <p>
            <span className="font-bold">Buyers: </span>
            <a href="mailto:buyers@tradelink.com" className="text-[#1f7bff]">
              buyers@tradelink.com
            </a>
          </p>
        </div>
      ),
    },
    {
      icon: <CiLocationOn color="#F89216" size={28} />,
      title: "Our Office",
      desc: "TradeLink Headquarters",
      content: (
        <div className="space-y-2 text-gray-700">
          <p>123 TradeLink Street, Floor 100</p>
          <p>Lagos, Nigeria</p>
          <Link to="/GetDirections">
            <Button
              icon={<CiLocationOn />}
              name="Get Directions"
              bgColor="#30ac57"
              hoverBgColor="#f89216"
              hoverTextColor="#333333"
              textColor="white"
            />
          </Link>
        </div>
      ),
    },
    {
      icon: <IoMdHelpCircle color="#F89216" size={28} />,
      title: "Quick Help",
      desc: "Find answers and resources fast",
      content: (
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <Link to="/FAQ">
            <Button
              name="View FAQs"
              className="w-full"
              bgColor="#30ac57"
              hoverBgColor="#f89216"
              hoverTextColor="#333333"
              textColor="white"
            />
          </Link>
          <Link to="/SellWithUs">
            <Button
              name="Become a Seller"
              className="w-full"
              bgColor="#30ac57"
              hoverBgColor="#f89216"
              hoverTextColor="#333333"
              textColor="white"
            />
          </Link>
          <Link to="/ReportIssue">
            <Button
              name="Report an Issue"
              className="w-full"
              bgColor="#30ac57"
              hoverBgColor="#f89216"
              hoverTextColor="#333333"
              textColor="white"
            />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <main className="mt-10">
      {/* Top Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center justify-center space-y-4 pt-28 pb-16"
      >
        <div className="flex gap-1 items-center px-5 py-2 rounded-full bg-[#f89216] shadow-md">
          <h2 className="text-[18px] text-white font-semibold max-mobile:text-[15px]">
            Contact Us
          </h2>
        </div>

        <p className="text-[40px] text-[#333333] max-[510px]:text-[32px] max-mobile:text-[24px] max-mobile:w-[280px] leading-[1.3] font-bold text-center max-w-[700px]">
          We're here to help. Get in touch with our support team.
        </p>
      </motion.section>

      {/* Cards Section */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
              className="bg-white p-6 rounded-[24px] shadow hover:shadow-lg transition"
            >
              <ContactCard icon={card.icon} title={card.title} desc={card.desc}>
                {card.content}
              </ContactCard>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white shadow-lg p-8 rounded-[30px] mb-25">
            <ContactForm />
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;

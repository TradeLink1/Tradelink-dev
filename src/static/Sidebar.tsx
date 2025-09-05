import { Link } from "react-router-dom";
import Button from "../components/reusable/Button";
import { TbChevronDown } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

const Sidebar = ({ handleToggle }: any) => {
  const [showDropdown, setShowDropwn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // ✅ track user's name

  const toggleDropdown = () => {
    setShowDropwn(!showDropdown);
  };

  //  Check login state + role + name
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      const storedName = localStorage.getItem("name"); // assuming you store user name
      setIsLoggedIn(!!token);
      setRole(storedRole);
      setUserName(storedName);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  //  Logout handler
  const handleLogout = async () => {
    try {
      await api.post("api/v1/auth/logout");
    } catch (error) {
      console.error("Logout failed on server, clearing local anyway", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name"); // remove stored name
      setIsLoggedIn(false);
      setRole(null);
      setUserName(null);

      window.dispatchEvent(new Event("storage"));
      window.location.href = "/";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed left-0 w-full pb-10 h-[80vh] flex items-center justify-center z-30 max-mobile:h-[550px] bg-amber-50/94 backdrop-blur-lg rounded-b-3xl p-6 shadow-lg"
        style={{
          backdropFilter: "saturate(180%) blur(7px)",
          WebkitBackdropFilter: "saturate(180%) blur(4px)",
          boxShadow: "0 4px 16px 0 rgba(0,0,0,0.07)",
        }}
      >
        <section className="flex flex-col gap-7 text-[#333333] font-semibold text-center text-[16px] max-mobile:gap-3">
          {/* Categories */}
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center gap-1.5 hover:text-[#f89216] font-semibold border-b pb-2 border-[#f89216]"
          >
            <TbChevronDown size={20} /> Categories
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex flex-col justify-center gap-2 text-medium text-[#fff] rounded-md p-3"
                style={{ backgroundColor: "#30ac57" }}
              >
                <Link
                  to="Categories/Products"
                  onClick={handleToggle}
                  className="hover:text-[#f89216] flex items-center gap-1"
                >
                  <HiOutlineShoppingCart /> Products
                </Link>
                <Link
                  to="Categories/Services"
                  onClick={handleToggle}
                  className="hover:text-[#f89216] flex items-center gap-1"
                >
                  <MdMiscellaneousServices /> Services
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Other Links */}
          <Link to="/AboutUs" onClick={handleToggle}>
            <nav className="hover:text-[#f89216]  items-center gap-1 border-b pb-2 border-[#f89216]">
              About Us
            </nav>
          </Link>
          <Link to="/Faq" onClick={handleToggle}>
            <nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216]">
              FAQs
            </nav>
          </Link>
          <Link to="/Contact" onClick={handleToggle}>
            <nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216]">
              Contact Us
            </nav>
          </Link>

          {/*  Auth buttons */}
          {isLoggedIn ? (
            <>
              {role === "seller" ? (
                <a href="/Dashboard" rel="noopener noreferrer">
                  <Button
                    name="Dashboard"
                    bgColor="#f89216"
                    hoverBgColor="#333333"
                    hoverTextColor="white"
                  />
                </a>
              ) : (
                //  Buyer view: Welcome back + Sell With Us
                <>
                  <Button
                    name={`Welcome back, ${userName || "User"}`}
                    bgColor="#30ac57"
                    hoverBgColor="#333333"
                    hoverTextColor="white"
                  />
                  <a href="/SellWithUs" rel="noopener noreferrer">
                    <Button
                      name="Sell With Us"
                      bgColor="#f89216"
                      hoverBgColor="#333333"
                      hoverTextColor="white"
                    />
                  </a>
                </>
              )}

              <button onClick={handleLogout}>
                <Button
                  name="Logout"
                  border="2px solid "
                  borderColor="#f89216"
                  hoverBgColor="#30ac57"
                  hoverTextColor="white"
                />
              </button>
            </>
          ) : (
            <>
              <a href="/Login" rel="noopener noreferrer">
                <Button
                  name="Login"
                  border="2px solid "
                  borderColor="#f89216"
                  hoverBgColor="#30ac57"
                  hoverTextColor="white"
                />
              </a>
              <a href="/Register" rel="noopener noreferrer">
                <Button
                  name="Register"
                  bgColor="#f89216"
                  hoverBgColor="#333333"
                  hoverTextColor="white"
                />
              </a>
              <Link to="/SellWithUs">
                <nav className="hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out flex items-center gap-1">
                  <MdOutlineSell />
                  Sell With Us
                </nav>
              </Link>
            </>
          )}
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;

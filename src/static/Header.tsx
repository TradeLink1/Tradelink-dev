import Button from "../components/reusable/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { TbChevronDown } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import Sidebar from "./Sidebar";
import api from "../api/axios"; // added for logout

const Header = () => {
  const [showDropdown, setShowDropwn] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [role, setRole] = useState<string | null>(null); // track role

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY || window.scrollY < lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = window.scrollY;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setVisible(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login state + role
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      setIsLoggedIn(!!token);
      setRole(storedRole);
    };

    checkLogin(); 
    window.addEventListener("storage", checkLogin); 

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout"); 
    } catch (error) {
      console.error("Logout failed on server, clearing local anyway", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name"); // remove name too
      setIsLoggedIn(false);
      setRole(null);

      window.dispatchEvent(new Event("storage"));

      window.location.href = "/Login";
    }
  };

  return (
    <>
      <div
        className={`bg-white w-full backdrop-blur-md fixed z-50 top-0 left-0 right-0 border-b-1 border-[#d6d6d6] transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "saturate(180%) blur(7px)",
          WebkitBackdropFilter: "saturate(180%) blur(8px)",
        }}
      >
        <div className="px-20 py-5 flex justify-between items-center max-w-[1200px] mx-auto text-[15px] max-tablet:px-10 top-0 z-20 max-mobile:px-5 ">
          <section className="flex gap-18 items-center  ">
            <div>
              <Link to="/">
                <img
                  className="max-w-[120px]  max-mobile:w-[130px]"
                  src="/header.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex gap-8 text-[#333333] font-medium max-tablet:hidden  ">
              <div
                onMouseEnter={() => setShowDropwn(true)}
                onMouseLeave={() => setShowDropwn(false)}
                className="relative"
              >
                <nav className="flex items-center gap-1.5 hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out cursor-pointer">
                  Categories <TbChevronDown size={20} />
                </nav>
                {showDropdown && (
                  <div className="absolute top-full left-0 bg-[#30ac57] shadow-lg w-34 flex flex-col p-3 justify-center items-center z-50 rounded-md text-white font-semibold gap-2">
                    <Link
                      className="hover:text-[#f89216] flex items-center gap-1"
                      to="/Categories/Products"
                    >
                      <HiOutlineShoppingCart /> Products
                    </Link>
                    <Link
                      className="hover:text-[#f89216] flex items-center gap-1"
                      to="/Categories/Services"
                    >
                      <MdMiscellaneousServices /> Services
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/AboutUs">
                <nav className="hover:text-[#f89216] flex items-center gap-1 hover:transistion-colors hover:duration-500 hover:ease-in-out ">
                  <MdOutlineSell /> About Us
                </nav>
              </Link>
              <Link to="/Faq">
                <nav className="hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out ">
                  FAQs
                </nav>
              </Link>
              <Link to="/Contact">
                <nav className="hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out ">
                  Contact Us
                </nav>
              </Link>
            </div>
          </section>

          {/* Updated buttons section */}
          <section className="flex gap-3 items-center text-[#333333] font-medium text-[15px] max-tablet:hidden">
            {isLoggedIn ? (
              <>
                {/* Seller */}
                {role === "seller" && (
                  <a href="/Dashboard" rel="noopener noreferrer">
                    <Button
                      name="My Dashboard"
                      bgColor="#f89216"
                      hoverBgColor="#333333"
                      hoverTextColor="white"
                    />
                  </a>
                )}

                {/* Non-seller users */}
                {role !== "seller" && (
                  <>
                    <a href="/userProfile" rel="noopener noreferrer">
                      <Button
                        name={`${localStorage.getItem("name") || "User"} Profile`}
                        bgColor="#f89216"
                        hoverBgColor="#333333"
                        hoverTextColor="white"
                      />
                    </a>

                    <Link to="/SellWithUs" rel="noopener noreferrer">
                      <Button
                        name="Sell With Us"
                        bgColor="#f89216"
                        hoverBgColor="#333333"
                        hoverTextColor="white"
                      />
                    </Link>
                  </>
                )}

                {/* Logout button */}
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
                <Link to="/SellWithUs" rel="noopener noreferrer">
                  <Button
                    name="Sell With Us"
                    bgColor="#f89216"
                    hoverBgColor="#333333"
                    hoverTextColor="white"
                  />
                </Link>
              </>
            )}
          </section>

          <section className="lg:hidden cursor-pointer max-[1030px]:hidden max-[900px]:flex ">
            {toggle ? (
              <FiX size={30} color="#f89316" onClick={handleToggle} />
            ) : (
              <CgMenuRight size={30} color="#333333" onClick={handleToggle} />
            )}
          </section>
        </div>
        <section>
          <div className="lg-hidden">
            {toggle && <Sidebar handleToggle={handleToggle} />}
          </div>
        </section>
      </div>
    </>
  );
};

export default Header;

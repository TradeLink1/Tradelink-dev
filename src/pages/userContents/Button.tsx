import React from "react";

type ButtonProps = {
  link: { name: string; icon: React.ReactNode; label: string };
  onClickNav: (name: string) => void;
  active: string;
};

const Button: React.FC<ButtonProps> = ({ link, onClickNav, active }) => (
  <button
    onClick={() =>
      link.name === "logout"
        ? (window.location.href = "/logout")
        : onClickNav(link.name)
    }
    className={`flex items-center gap-2 px-4 py-2 rounded text-gray-800 hover:bg-[#FEF6E1] ${
      active === link.name ? "font-semibold bg-[#FEF6E1]" : ""
    }`}
  >
    {link.icon} <span>{link.label}</span>
  </button>
);

export default Button;

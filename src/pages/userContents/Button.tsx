import React from "react";

type ButtonProps = {
  link: {
    name: string;
    icon: React.ReactNode;
    label: string;
  };
  onClickNav: (name: string) => void;
  active: string;
};

const Button: React.FC<ButtonProps> = ({ link, onClickNav, active }) => {
  const handleClick = () => {
    if (link.name.toLowerCase() === "logout") {
      window.location.href = "/logout";
    } else {
      onClickNav(link.name);
    }
  };

  const isActive = active === link.name;

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded text-gray-800 hover:bg-[#FEF6E1] ${
        isActive ? "font-semibold bg-[#FEF6E1]" : ""
      }`}
    >
      {link.icon}
      <span>{link.label}</span>
    </button>
  );
};

export default Button;

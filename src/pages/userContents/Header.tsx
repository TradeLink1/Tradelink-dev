import React from "react";

type HeaderProps = {
  user: {
    name: string;
    logo: string;
  };
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  const formattedName = user.name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(" ");

  const firstLetter = formattedName.charAt(0);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const currentMonth = now.getMonth();
  const randomMonthIndex =
    Math.floor(Math.random() * (currentMonth - 2 + 1)) + 2;
  const customerSince = `${months[randomMonthIndex]} 2025`;

  return (
    <div className="bg-gradient-to-r from-[#FEF6E1] via-[#FFF3C7] to-[#FEF6E1] py-10 px-6 rounded-b-3xl shadow-md flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-[#EC8E1C] flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4 overflow-hidden">
        {user.logo ? (
          <img
            src={user.logo}
            alt={formattedName}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          firstLetter
        )}
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">{formattedName}</h1>
      <p className="text-gray-500 text-sm mt-1">
        Customer since {customerSince}
      </p>
    </div>
  );
};

export default Header;

import React from "react";

type HeaderProps = {
  user: {
    name: string;
    avatarUrl?: string;
  };
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <div className="bg-gradient-to-r from-[#FEF6E1] via-[#FFF3C7] to-[#FEF6E1] py-10 px-6 rounded-b-3xl shadow-md flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-[#EC8E1C] flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4 overflow-hidden">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          firstLetter
        )}
      </div>

      <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
      <p className="text-gray-500 text-sm mt-1">Customer since 2023</p>
    </div>
  );
};

export default Header;

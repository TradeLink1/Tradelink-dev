const coming = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f2ea] text-gray-800 p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15rem] sm:text-[25rem] md:text-[30rem] lg:text-[40rem] text-gray-200 opacity-50 font-extralight animate-pulse">
        &lt;
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[15rem] sm:text-[25rem] md:text-[30rem] lg:text-[40rem] text-gray-200 opacity-50 font-extralight animate-pulse">
        &gt;
      </div>

      <div className="max-w-xl text-center z-10">
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

export default coming;

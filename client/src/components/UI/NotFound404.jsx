import { Home } from "lucide-react";

const NotFound404 = () => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-10">
      <h1
        className="
          font-black leading-none select-none mb-3 sm:mb-6
          text-[110px] sm:text-[140px] md:text-[200px] lg:text-[260px]
        "
      >
        <span className="bg-linear-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">
          4
        </span>
        <span className="bg-linear-to-br from-green-500 to-green-700 bg-clip-text text-transparent">
          0
        </span>
        <span className="bg-linear-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">
          4
        </span>
      </h1>

      {/* ================= SUBTEXT ================= */}
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 mb-8 sm:mb-12 text-center">
        Page Not Found
      </h2>

      {/* ================= BUTTON ================= */}
      <button
        onClick={() => (window.location.href = "/")}
        className="
          group flex items-center gap-2 sm:gap-3
          px-6 sm:px-10 md:px-14
          py-3 sm:py-4 md:py-6
          text-base sm:text-lg md:text-xl font-bold text-white rounded-md
          bg-linear-to-r from-blue-600 to-blue-700
          transition-all duration-300
          hover:scale-105 active:scale-95
          shadow-xl cursor-pointer
        "
      >
        <Home className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        Go Home
      </button>
    </div>
  );
};

export default NotFound404;

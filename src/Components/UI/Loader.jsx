import React, { useState, useEffect } from "react";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // wait till 100%
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // count speed

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#FAF8F3] fixed inset-0 z-[99999]">
      <div className="flex flex-col items-center">
        {/* Logo Section */}
        <div className="relative mb-6">
          <img
            src="/NewLogo.png"
            alt="Loading..."
            className="w-24 h-24 object-contain animate-pulse"
          />
        </div>

        {/* Brand Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-gray-800">
            <span className="text-[#E87461]">A</span>lpha{" "}
            <span className="text-[#E87461]">O</span>mega{" "}
            <span className="text-[#E87461]">C</span>harity
          </h1>
          {/* Underline for style */}
          <div className="h-1 w-16 bg-[#E87461] mx-auto mt-2 rounded-full"></div>
        </div>
        {/* Percentage and Bar */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-black text-[#E87461]">
            {progress}%
          </span>

          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-[#E87461] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-gray-400 text-[10px] uppercase tracking-[0.5em] mt-4">
            Bringing smiles to lives
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;

import React from "react";

const PageLoader = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8 animate-pulse">
      {/* Hero Section */}
      <div className="skeleton h-64 w-full rounded-2xl bg-gray-300"></div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Title */}
        <div className="skeleton h-10 w-2/3 rounded-lg bg-gray-300"></div>

        {/* Paragraphs */}
        <div className="space-y-3">
          <div className="skeleton h-4 w-full rounded bg-gray-300"></div>
          <div className="skeleton h-4 w-full rounded bg-gray-300"></div>
          <div className="skeleton h-4 w-4/5 rounded bg-gray-300"></div>
        </div>

        {/* Another section break or smaller image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="skeleton h-40 w-full rounded-xl bg-gray-300"></div>
          <div className="skeleton h-40 w-full rounded-xl bg-gray-300"></div>
        </div>

        {/* More text */}
        <div className="space-y-3">
          <div className="skeleton h-4 w-full rounded bg-gray-300"></div>
          <div className="skeleton h-4 w-full rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;

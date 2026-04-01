import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../data/useSiteContent";

const LegalDashboard = () => {
  const legalContent = useSiteContent("legal-page", "/content/legal-page.json", {
    pageTitle: "Legal",
    statusText: "Verified Compliance: 2026 Humanitarian Fiscal Year",
    downloadsTitle: "Quick Downloads",
    downloads: [],
    sections: [],
  });
  const [active, setActive] = useState("TaxExempt");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = legalContent.sections || [];
  const activeSection =
    sections.find((section) => section.key === active) || sections[0];

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1C1E21] font-sans">
      {/* Header */}
      <header className="bg-[#4A3F35] shadow-sm h-16 sticky top-0 z-50 flex items-center px-4 md:px-6 justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className=" mt-53 md:hidden text-white font-bold p-2 bg-[#E87461] rounded"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "Close" : "More"}
        </button>
      </header>
      <div className="sm:w-200 w-60 mx-auto rounded-xl bg-brand">
        <h1 className="text-2xl pb-1 text-white font-bold text-center mt-2">
          {legalContent.pageTitle}
        </h1>
      </div>
      {/* Main Layout Container */}
      <div className="mt-12 sm:mt-2 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 pt-6 pb-6 px-4">
        {/* Left Navigation Sidebar */}

        <nav
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-72 space-y-2`}
        >
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => {
                setActive(section.key);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left p-4 rounded-xl font-bold transition-all ${
                active === section.key
                  ? "bg-[#E87461] text-white shadow-lg"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>

        {/* Center Content */}
        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <Motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-black text-[#4A3F35] mb-6">
                {activeSection?.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
                {activeSection?.content}
              </p>

              {/* Educational Diagram */}
              {active === "Audit" && (
                <div className="my-6 p-4 border rounded-lg bg-gray-50 text-center"></div>
              )}

              {/* Status Indicator */}
              <div className="flex items-center gap-3 p-4 bg-[#FFF5F3] border border-[#E87461]/20 rounded-lg">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs md:text-sm font-semibold text-[#E87461]">
                  {legalContent.statusText}
                </p>
              </div>
            </Motion.div>
          </AnimatePresence>
        </main>

        {/* Right Info Box (Desktop Only) */}
        <aside className="hidden lg:block w-80 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
            <h4 className="font-bold mb-4 text-[#4A3F35]">
              {legalContent.downloadsTitle}
            </h4>
            <div className="space-y-3">
              {legalContent.downloads?.map((item) => (
                <button
                  key={item}
                  className="w-full text-left text-sm py-2 px-3 hover:bg-[#E87461]/10 rounded-lg text-[#E87461] font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LegalDashboard;

import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../data/useSiteContent";

const AdminPrivacyPanel = () => {
  const privacyContent = useSiteContent(
    "privacy-page",
    "/content/privacy-page.json",
    {
    navigationTitle: "Policy Navigation",
    navigationSubtitle: "USA & BD Governance",
    helpText: "Need help? contact our legal team for specific policy queries.",
    headerLabel: "Alpha Omega Charity",
    contextTitle: "Audit Compliance",
    contextText:
      "Section verified for 2026 humanitarian operations in Bangladesh river erosion zones.",
    footerLabel: "Alpha Omega Inter Church Trust",
      sections: [],
    }
  );
  const [active, setActive] = useState("Compliance");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = privacyContent.sections || [];
  const activeSection =
    sections.find((section) => section.key === active) || sections[0];

  return (
    <div className="min-h-screen container bg-white flex flex-col md:flex-row relative pt-16 overflow-x-hidden">
      {/* --- Fixed Header --- */}
      <header className="bg-[#4A3F35] w-full h-16 fixed top-0 left-0 z-60 flex items-center px-6 justify-between shadow-md">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 font-bold mt-28 rounded-full -ml-4 bg-brand text-white md:hidden focus:outline-none z-70 "
        >
          {!isMenuOpen && "More"}
        </button>
      </header>

      {/* --- Mobile Sidebar Overlay --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- Sidebar Navigation --- */}
      <aside
        className={`
          fixed md:sticky top-0.6 left-0 z-50
          w-72 md:w-64 h-[calc(100vh-64px)]
          bg-[#E87461] text-white p-6 sm:shadow-xl
          transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <button
          className=" mt-14 cursor-pointer sm:hidden ml-2 bg-white p-2 rounded-full text-red-500"
          onClick={() => setIsMenuOpen(false)}
        >
          Close
        </button>
        <div className=" hidden md:block  border-b border-white/20 pb-4">
          <h2 className="text-lg font-bold">{privacyContent.navigationTitle}</h2>
          <p className="text-[10px] text-white/70 uppercase tracking-tighter">
            {privacyContent.navigationSubtitle}
          </p>
        </div>
        <nav className="space-y-2 mt-12">
          {sections.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key);
                setIsMenuOpen(false);
              }}
              className={` cursor-pointer w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                active === item.key
                  ? "bg-white text-[#E87461] shadow-xl font-bold"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <span>{item.navLabel || item.title}</span>
              {active === item.key && (
                <Motion.div
                  layoutId="arrow"
                  className="w-1.5 h-1.5 bg-[#E87461] rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-10 left-6 right-6 p-4 bg-white/10 rounded-lg border border-white/10 hidden md:block">
          <p className="text-[10px] leading-relaxed">
            {privacyContent.helpText}
          </p>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className=" mt-8 sm:-mt-12  flex-1 p-4 md:p-10 lg:p-16 min-h-[calc(100vh-64px)] overflow-y-auto">
        <AnimatePresence mode="wait">
          <Motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className=" max-w-4xl mx-auto pb-4--- bg-white sm:shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#FDF2F0] p-6  md:p-10 border-b border-[#FCE3DF] ">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-0.5 bg-[#E87461]"></span>
                  <span className="text-[#E87461] text-[10px] font-bold uppercase tracking-[0.2em]">
                    {privacyContent.headerLabel}
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-black text-[#4A3F35] tracking-tight">
                  {activeSection?.title}
                </h1>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10 space-y-12">
              <div className="space-y-8">
                {activeSection?.details?.map((detail, idx) => (
                  <Motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="group"
                  >
                    <h3 className="text-[#E87461] font-extrabold text-lg mb-3 flex items-start gap-4 uppercase tracking-wide">
                      <span className="mt-1 shrink-0 w-5 h-5 bg-[#E87461]/10 text-[#E87461] rounded-full flex items-center justify-center text-[10px] border border-[#E87461]/20">
                        {idx + 1}
                      </span>
                      {detail.subtitle}
                    </h3>
                    <p className="text-gray-500 leading-relaxed pl-9 text-sm md:text-base">
                      {detail.text}
                    </p>
                  </Motion.div>
                ))}
              </div>

              {/* Context Box */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-[#4A3F35] text-xs uppercase tracking-widest mb-1">
                    {privacyContent.contextTitle}
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    {privacyContent.contextText}
                  </p>
                </div>
                <div className="md:ml-auto flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-[8px] font-bold">
                    IRS
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[8px] font-bold">
                    CCPA
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[8px] font-bold">
                    GDPR
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#4A3F35] py-8 px-6 text-center">
              <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] mb-2 font-medium">
                {privacyContent.footerLabel}
              </p>
              <div className="h-px w-12 bg-white/10 mx-auto"></div>
            </footer>
          </Motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminPrivacyPanel;

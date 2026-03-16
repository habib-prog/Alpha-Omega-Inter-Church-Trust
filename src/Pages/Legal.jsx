import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const LegalDashboard = () => {
  const [active, setActive] = useState("TaxExempt");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const legalSections = {
    TaxExempt: {
      title: "Tax & Financial Status (USA)",
      content:
        "Alpha Omega Charity holds 501(c)(3) tax-exempt status in the USA. All donations made by US citizens are tax-deductible to the extent allowed by law. Donors will receive an automated annual tax receipt via email for all contributions exceeding $250.",
    },
    CrossBorder: {
      title: "Cross-Border Fund Transfer",
      content:
        "We adhere strictly to both USA (OFAC/Anti-Money Laundering) and Bangladesh (NGO Affairs Bureau) regulations. Funds are transferred through authorized banking channels, and every transfer is documented with clear humanitarian intent.",
    },
    Audit: {
      title: "Annual Audit & Transparency",
      content:
        "We conduct annual independent audits to ensure financial integrity. Our financial statements, including administrative overhead costs and direct project spend in Bangladesh, are available for review upon request by certified donors.",
    },
    DataPrivacy: {
      title: "Data Privacy & Donor Rights",
      content:
        "We comply with CCPA and GDPR protocols. You have the right to request access to your data, request deletion, or opt-out of newsletters. We maintain a 'No-Sell' policy: your information is never shared with third-party marketers.",
    },
    RefundPolicy: {
      title: "Donation Refund Policy",
      content:
        "While charitable donations are non-refundable, we offer a 7-day grace period for duplicate transactions or erroneous donation amounts. Please contact finance@alphaomegacharity.org with your transaction ID for manual verification.",
    },
  };

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
          Legal
        </h1>
      </div>
      {/* Main Layout Container */}
      <div className="mt-12 sm:mt-2 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 pt-6 pb-6 px-4">
        {/* Left Navigation Sidebar */}

        <nav
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-72 space-y-2`}
        >
          {Object.keys(legalSections).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActive(key);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left p-4 rounded-xl font-bold transition-all ${
                active === key
                  ? "bg-[#E87461] text-white shadow-lg"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {legalSections[key].title}
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
                {legalSections[active].title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
                {legalSections[active].content}
              </p>

              {/* Educational Diagram */}
              {active === "Audit" && (
                <div className="my-6 p-4 border rounded-lg bg-gray-50 text-center"></div>
              )}

              {/* Status Indicator */}
              <div className="flex items-center gap-3 p-4 bg-[#FFF5F3] border border-[#E87461]/20 rounded-lg">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs md:text-sm font-semibold text-[#E87461]">
                  Verified Compliance: 2026 Humanitarian Fiscal Year
                </p>
              </div>
            </Motion.div>
          </AnimatePresence>
        </main>

        {/* Right Info Box (Desktop Only) */}
        <aside className="hidden lg:block w-80 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
            <h4 className="font-bold mb-4 text-[#4A3F35]">Quick Downloads</h4>
            <div className="space-y-3">
              <button className="w-full text-left text-sm py-2 px-3 hover:bg-[#E87461]/10 rounded-lg text-[#E87461] font-medium">
                Download 2025 Audit PDF
              </button>
              <button className="w-full text-left text-sm py-2 px-3 hover:bg-[#E87461]/10 rounded-lg text-[#E87461] font-medium">
                IRS Tax Exempt Letter
              </button>
              <button className="w-full text-left text-sm py-2 px-3 hover:bg-[#E87461]/10 rounded-lg text-[#E87461] font-medium">
                Privacy Agreement
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LegalDashboard;

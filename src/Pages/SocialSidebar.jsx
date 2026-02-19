import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaChevronLeft,
  FaChevronRight,
  FaXTwitter,
  FaWhatsapp,
  FaViber,
  FaSignal,
} from "react-icons/fa6";

const SocialSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const socialLinks = [
    { id: 1, icon: <FaFacebookF />, url: "#", color: "bg-[#1877F2]" },
    { id: 2, icon: <FaXTwitter />, url: "#", color: "bg-black" },
    { id: 3, icon: <FaWhatsapp />, url: "#", color: "bg-[#25D366]" },
    { id: 4, icon: <FaViber />, url: "#", color: "bg-[#7360F2]" },
    { id: 5, icon: <FaSignal />, url: "#", color: "bg-[#2090FF]" },
    { id: 6, icon: <FaInstagram />, url: "#", color: "bg-[#e4405f]" },
    { id: 7, icon: <FaLinkedinIn />, url: "#", color: "bg-[#0077b5]" },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[9999]">
      <div className="relative flex items-center">
        {/* Sidebar Container */}
        <Motion.div
          initial={{ x: 0 }}
          // Increased to -80 to fully hide the larger w-12 icons
          animate={{ x: isOpen ? 0 : -80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col gap-2 bg-white/10 backdrop-blur-xl p-2.5 rounded-r-3xl shadow-2xl border border-white/20"
        >
          {socialLinks.map((link) => (
            <Motion.a
              key={link.id}
              href={link.url}
              whileHover={{ scale: 1.1, x: 8 }}
              whileTap={{ scale: 0.9 }}
              className={`${link.color} text-white w-12 h-12 flex items-center justify-center rounded-2xl text-2xl transition-all shadow-lg`}
            >
              {link.icon}
            </Motion.a>
          ))}
        </Motion.div>

        {/* Toggle Button */}
        <Motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={false}
          // Pushed further left (-105) so it doesn't overlap the hidden icons
          animate={{ x: isOpen ? 0 : -105 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileHover={{ x: isOpen ? 5 : -100 }}
          className="bg-[#E87461] text-white p-2 h-20 w-14 rounded-r-2xl shadow-lg hover:brightness-110 active:scale-95 flex items-center justify-center cursor-pointer border-y border-r border-white/30"
        >
          {isOpen ? (
            <FaChevronLeft size={22} />
          ) : (
            <div className="pl-8">
              {/* pl-8 ensures the arrow peeks out nicely from the left edge */}
              <FaChevronRight size={22} />
            </div>
          )}
        </Motion.button>
      </div>
    </div>
  );
};

export default SocialSidebar;

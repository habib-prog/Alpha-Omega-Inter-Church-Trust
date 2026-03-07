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
    /**
     * pointer-events-none is used on the parent container so it doesn't
     * block clicks on elements behind the invisible parts of this fixed div.
     */
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-9999 pointer-events-none">
      <div className="relative flex items-center">
        {/* Sidebar Container */}
        <Motion.div
          initial={{ x: 0 }}
          animate={{ x: isOpen ? 0 : -80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          /**
           * pointer-events-auto re-enables clicking for the actual sidebar content.
           */
          className="flex flex-col gap-2 bg-white/10 backdrop-blur-xl p-2.5 rounded-r-3xl shadow-2xl border border-white/20 pointer-events-auto"
        >
          {socialLinks.map((link) => (
            <Motion.a
              key={link.id}
              href={link.url}
              whileHover={{ scale: 1.1, x: 8 }}
              whileTap={{ scale: 0.9 }}
              className={`${link.color} text-white w-7 h-7 flex items-center justify-center rounded-2xl text-md transition-all shadow-lg`}
            >
              {link.icon}
            </Motion.a>
          ))}
        </Motion.div>

        {/* Toggle Button */}
        <Motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={false}
          animate={{ x: isOpen ? 0 : -80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          /**
           * pointer-events-auto ensures the toggle button remains clickable.
           */
          className="bg-[#E87461] text-white p-2 h-12 w-14 rounded-r-2xl shadow-lg hover:brightness-110 active:scale-95 flex items-center justify-center cursor-pointer border-y border-r border-white/30 pointer-events-auto -ml-0.5"
        >
          {isOpen ? (
            <FaChevronLeft size={15} />
          ) : (
            <div className="pl-4">
              <FaChevronRight size={20} />
            </div>
          )}
        </Motion.button>
      </div>
    </div>
  );
};

export default SocialSidebar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiBarsArrowDown } from "react-icons/hi2";
import { NavHashLink } from "react-router-hash-link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = `relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#E87461] after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 ${
    isScrolled ? "text-gray-800" : "text-white"
  }`;

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 w-full z-120 navbar transition-all duration-500 flex justify-center items-center 
        ${
          isScrolled
            ? "bg-[#FAF8F3]/95 py-3 shadow-md"
            : "bg-transparent py-5 shadow-none"
        }`}
      >
        <div className="flex-1 flex items-center gap-2 px-4 sm:px-8">
          <Link to="/" className="p-1">
            <img
              className="w-12 hover:scale-110 transition-transform duration-300 ease-in-out"
              src="/Logo-2.png"
              alt="Logo"
            />
          </Link>
          <span
            className={`sm:text-xl text-sm transition-colors duration-300 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="font-bold sm:text-xl text-xl">Inter Church</span>
            Trust
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center">
          <ul className="flex gap-4 ml-auto mr-2 items-center">
            <li>
              <NavHashLink smooth to="/#home" className={linkStyle}>
                Home
              </NavHashLink>
            </li>
            <li>
              <NavHashLink smooth to="/#about" className={linkStyle}>
                About us
              </NavHashLink>
            </li>

            {/* Campaigns Dropdown */}
            <li className="dropdown dropdown-hover group">
              <div
                tabIndex={0}
                role="button"
                className={`flex items-center gap-1 cursor-pointer py-4 transition-colors duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`}
              >
                <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#E87461] after:transition-all after:duration-300 group-hover:after:w-full">
                  Campaigns
                </span>
                <svg
                  className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isScrolled ? "text-gray-600" : "text-white"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-130 menu p-2 shadow-xl bg-white border border-gray-100 rounded-lg w-48 mt-0 text-gray-800"
              >
                <li>
                  <NavHashLink smooth to="/all-campaigns">
                    All Campaigns
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/goal">
                    Goal Amount
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/raised">
                    Raised Amount
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/progress">
                    Progress Bar
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/past-campaigns">
                    Past Campaigns
                  </NavHashLink>
                </li>
              </ul>
            </li>

            <li>
              <NavHashLink smooth to="/#news" className={linkStyle}>
                News Letters
              </NavHashLink>
            </li>

            {/* More Dropdown */}
            <li className="dropdown dropdown-hover group">
              <div
                tabIndex={0}
                role="button"
                className={`flex items-center gap-1 cursor-pointer py-4 transition-colors duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`}
              >
                <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#E87461] after:transition-all after:duration-300 group-hover:after:w-full">
                  More
                </span>
                <svg
                  className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isScrolled ? "text-gray-600" : "text-white"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-130 menu p-2 shadow-xl bg-white border border-gray-100 rounded-lg w-44 mt-0 text-gray-800"
              >
                <li>
                  <NavHashLink smooth to="/#gallery">
                    Gallery
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/#contact">
                    Contact Us
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/#legal">
                    Legal
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/#history">
                    Donation History
                  </NavHashLink>
                </li>
                <li>
                  <NavHashLink smooth to="/login">
                    Login
                  </NavHashLink>
                </li>
              </ul>
            </li>
          </ul>
          <div className="px-4">
            <button className="items-center cursor-pointer font-medium transition-all bg-[#E87461] text-white hover:bg-[#D66350] shadow-lg shadow-[#E87461]/20 h-9 px-4 text-sm rounded-full active:scale-95">
              Donate Now
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="flex-none px-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-[#E87461]"
            >
              <div className="w-10 rounded-full">
                <img alt="User" src="/russel.png" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-130 mt-3 w-52 p-2 shadow text-gray-800"
            >
              <li>
                <a>
                  Profile <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Admin Panel</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hamburger - Mobile only */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`sm:hidden block px-4 z-130 transition-colors duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`}
        >
          <HiBarsArrowDown
            className={`text-3xl transition-transform ${isOpen ? "rotate-180 text-[#E87461]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu Content - Top & Left Entry */}
      <div
        className={`fixed inset-0 z-110 sm:hidden transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Menu Items: top-22 (from top) and transform (from left) */}
        <ul
          className={`absolute top-0 left-0 w-full bg-[#FAF8F3] pt-29 pb-10 px-6 shadow-2xl flex flex-col gap-4 transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } text-gray-800 rounded-b-3xl`}
        >
          <li>
            <NavHashLink
              onClick={() => setIsOpen(false)}
              smooth
              to="/#home"
              className="text-lg font-medium"
            >
              Home
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              onClick={() => setIsOpen(false)}
              smooth
              to="/login"
              className="text-lg font-medium"
            >
              Login
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              onClick={() => setIsOpen(false)}
              smooth
              to="/#about"
              className="text-lg font-medium"
            >
              About us
            </NavHashLink>
          </li>

          <div className="border-t border-gray-200 pt-2">
            <span className="font-bold text-[#E87461] text-xs">CAMPAIGNS</span>
            <li className="pl-2 mt-2">
              <NavHashLink onClick={() => setIsOpen(false)} to="/all-campaigns">
                All Campaigns
              </NavHashLink>
            </li>
            <li className="pl-2 mt-2">
              <NavHashLink
                onClick={() => setIsOpen(false)}
                to="/past-campaigns"
              >
                Past Campaigns
              </NavHashLink>
            </li>
            <li className="pl-2 mt-2">
              <NavHashLink
                onClick={() => setIsOpen(false)}
                to="/past-campaigns"
              >
                Goal Amount
              </NavHashLink>
            </li>
            <li className="pl-2 mt-2">
              <NavHashLink
                onClick={() => setIsOpen(false)}
                to="/past-campaigns"
              >
                Raised Amount
              </NavHashLink>
            </li>
            <li className="pl-2 mt-2">
              <NavHashLink
                onClick={() => setIsOpen(false)}
                to="/past-campaigns"
              >
                Progress Bar
              </NavHashLink>
            </li>
          </div>

          <li>
            <NavHashLink
              onClick={() => setIsOpen(false)}
              smooth
              to="/#news"
              className="text-lg font-medium"
            >
              News Letters
            </NavHashLink>
          </li>

          <div className="border-t border-gray-200 pt-2 flex flex-col gap-3">
            <li>
              <NavHashLink onClick={() => setIsOpen(false)} to="/#gallery">
                Gallery
              </NavHashLink>
            </li>
            <li>
              <NavHashLink onClick={() => setIsOpen(false)} to="/#contact">
                Contact Us
              </NavHashLink>
            </li>
          </div>

          <button className="w-full bg-[#E87461] text-white py-3 mt-2 rounded-full font-bold shadow-lg">
            Donate Now
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

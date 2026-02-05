import { Link } from "react-router";
import { FiTwitter } from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#4A3F35] py-10 text-neutral-content flex flex-col items-center">
      <div className="container-custom flex flex-wrap sm:footer-horizontal w-full justify-between items-start mb-10">
        <nav>
          <Link className="text-[#FAF8F3 ] flex items-center gap-1">
            <img src="/Logo-2.png" alt="alphaomega" className="  max-w-8" />
            <span className="font-bold text-xl">Inter Church</span>Trust
          </Link>
          <p className="text-[#FAF8F3]/60 max-w-75 mt-2">
            Building a world where compassion knows no borders. Join us in
            creating sustainable change for communities worldwide.
          </p>
        </nav>
        {/*pages*/}
        <nav>
          <h6 className="font-bold text-xl mb-2 text-[#FAF8F3] flex">
            Quick Links
          </h6>
          <Link to="/" className=" flex text-[#FAF8F3]/60 hover:text-[#E87461]">
            Home
          </Link>
          <Link
            to="/about"
            className=" flex text-[#FAF8F3]/60 hover:text-[#E87461]"
          >
            About Us
          </Link>
          <Link
            to="/work"
            className=" flex text-[#FAF8F3]/60 hover:text-[#E87461]"
          >
            Our Work
          </Link>
          <Link
            to="/contact"
            className=" flex text-[#FAF8F3]/60 hover:text-[#E87461]"
          >
            Contact
          </Link>
        </nav>
        {/*Social link*/}
        <nav>
          <h6 className="font-bold mb-2 text-xl text-[#FAF8F3]">Connect</h6>
          <Link className="flex items-center gap-1.5 text-[#FAF8F3]/60 hover:text-[#E87461]">
            <FiTwitter className="text-[#1DA1F2] text-xl" /> Twitter
          </Link>
          <Link className="flex items-center gap-1.5 text-[#FAF8F3]/60 hover:text-[#E87461]">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <defs>
                <linearGradient
                  id="igGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#F58529" />
                  <stop offset="50%" stopColor="#DD2A7B" />
                  <stop offset="100%" stopColor="#8134AF" />
                </linearGradient>
              </defs>
              <path
                fill="url(#igGradient)"
                d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            Instagram
          </Link>
          <Link className="flex items-center gap-1.5 text-[#FAF8F3]/60 hover:text-[#E87461]">
            <FaLinkedinIn className="text-[#0A66C2] text-xl" /> LinkedIn
          </Link>
          <Link className="flex items-center gap-1.5 text-[#FAF8F3]/60 hover:text-[#E87461]">
            <FaSquareFacebook className="text-[#1877F2] text-xl" /> Facebook
          </Link>
        </nav>
        {/*Copyright Section*/}
      </div>
      <div className="container-custom w-full pt-8 border-t border-[#FAF8F3]/5 sm:flex sm:gap-10 text-sm text-white items-center sm:m-auto sm:justify-center">
        <p className="flex justify-center ">
          © {new Date().getDate()}{" "}
          {new Date().toLocaleString("en-US", { month: "long" })}{" "}
          {new Date().getFullYear()} Apha Omega Inter Church Trust. All rights
          reserved.
        </p>
        <div className="flex items-center justify-center px-6 py-2">
          <p className="flex items-center sm:gap-2">
            Developed by:
            <Link to="https://www.bytnext.com/" target="_blank">
              <img
                className=" rounded-2xl w-17.5 hover:opacity-80 transition-opacity"
                src="/bytnextlogo.jpeg"
                alt="Logo"
              />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router";
import { HiBarsArrowDown } from "react-icons/hi2";

const Navbar = () => {
<<<<<<< HEAD
  const linkStyle =
    "relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#E87461] after:transition-all after:duration-300 hover:after:w-full";
  return (
    <div>
      <div className=" fixed top-0 left-0 w-full z-100 container-custom navbar bg-[#FAF8F3]/90 flex justify-center items-center shadow-sm">
        <div className="flex-1 flex items-center gap-2">
          <Link className="p-1">
            <img
              className="w-12 hover:scale-110 transition-transform duration-300 ease-in-out"
              src="/Logo-2.png"
              alt="Logo"
            />
          </Link>
          <span className="sm:text-xl text-sm">
            <span className="font-bold sm:text-3xl text-2xl">Inter Church</span>
            Trust
          </span>
        </div>

        {/* Navigation Options start */}
        <div className="hidden sm:flex items-center">
          <ul className="flex gap-4 ml-auto mr-8 ">
            <li>
              <Link className={linkStyle}>Home</Link>
            </li>
            <li>
              <Link className={linkStyle}>About us</Link>
            </li>
            <li>
              <Link className={linkStyle}>Charitable Work</Link>
            </li>
            <li>
              <Link className={linkStyle}>Login</Link>
            </li>
          </ul>
          <div className="px-4 ">
            <button className="items-center cursor-pointer  font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E87461] disabled:opacity-50 disabled:pointer-events-none bg-[#E87461] text-white hover:bg-[#D66350] shadow-lg shadow-[#E87461]/20 h-9 px-4 text-sm rounded-full ">
              Donate Now
            </button>
          </div>
        </div>
        {/* Navigation Options end */}

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="/user.jpeg" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Hamburger start */}
        <button className=" sm:hidden block px-2">
          <HiBarsArrowDown className="text-3xl" />
        </button>
        {/* Hamburger ended */}
=======
  return (
    <div className='container'>
      <div className='p-4 mt-2 fixed z-50 text-white bg-blue-100 w-full'>
        <h1>Navbar</h1>
>>>>>>> dece56b (hero section and about section)
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { ImHistory } from "react-icons/im";
import { IoStatsChart } from "react-icons/io5";
import DonationActivity from "../Components/UI/Charts/DonationActivity";
import { Link } from "react-router"; // react-router-dom use kora safe

const Profile = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="py-10 bg-white relative min-h-screen">
      {/* Brown Header Bar */}
      <div className="bg-[#4A3F35] w-full h-22 absolute top-0 z-0"></div>

      {/* Main Container: Mobile e Col, Desktop e Row */}
      <div className="relative z-10 w-full container mx-auto flex flex-col lg:flex-row gap-6 mt-18 px-4 lg:px-0">
        {/* Left Side: Profile Card */}
        <div className="wrap rounded-xl border-brand border-4 w-full sm:h-125 lg:w-112.5 flex justify-center flex-col items-center pb-8 bg-white shadow-sm">
          <p className="sm:text-2xl text-xl font-bold absolute top-2 left-7">
            Profile
          </p>
          <div className="Usercard w-full p-6 md:p-10 flex gap-2 justify-center items-center flex-col">
            <div className="img_box shadow-lg border-brand border-4 rounded-full w-24 h-24">
              <img
                src="/russel.png"
                className="rounded-full w-22 h-22 object-cover"
                alt="User"
              />
            </div>
            <h1 className="font-bold text-xl text-gray-800">Russel Abraham</h1>
            <div className="flex gap-1 justify-center items-center flex-col text-center">
              <div className="flex justify-center items-center gap-1">
                <CiLocationOn className="text-brand" />
                <p className="font-normal text-lg md:text-xl text-gray-500">
                  New York, WA
                </p>
              </div>
              <p className="font-normal text-sm md:text-xl text-gray-500">
                Member since January, 2026
              </p>
            </div>
          </div>

          {/* Donation Info Boxes */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-brand shadow-xl text-white w-28 md:w-30 p-2 flex items-center justify-center flex-col rounded-sm">
              <p className="font-bold text-lg md:text-xl">$1.250</p>
              <p className="text-xs md:text-base">Total Donated</p>
            </div>
            <div className="bg-brand shadow-xl rounded-sm text-white w-28 md:w-30 p-2 flex items-center justify-center flex-col">
              <p className="font-bold text-lg md:text-xl">12</p>
              <p className="text-xs md:text-base">Campaigns</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Link
            to="/editprofile"
            className="btn w-64 md:w-75 flex items-center justify-center text-white bg-brand hover:opacity-90 py-3 rounded-md font-bold transition-all"
          >
            Edit Profile
          </Link>
        </div>

        {/* Right Side: Stats/Impact Section */}
        <div className="stats border-brand border-4 flex flex-col w-full bg-white shadow-sm rounded-xl overflow-hidden">
          {/* Tabs Menu */}
          <div className="flex items-center justify-around h-12 bg-brand text-white">
            <div
              className={`flex gap-1 font-bold items-center cursor-pointer px-4 h-full ${open ? "border-b-4 border-white" : ""}`}
              onClick={() => setOpen(!open)}
            >
              <IoStatsChart />
              <p className="text-sm md:text-base">Impact</p>
            </div>
            <div className="flex font-bold gap-1 items-center cursor-pointer opacity-80 hover:opacity-100">
              <ImHistory />
              <p className="text-sm md:text-base">History</p>
            </div>
            <div className="flex font-bold gap-1 items-center cursor-pointer opacity-80 hover:opacity-100">
              <FiSettings />
              <p className="text-sm md:text-base">Setting</p>
            </div>
          </div>

          {/* Dynamic Content */}
          <div
            className={`stats-content p-4 md:p-6 ${open ? "block" : "hidden"}`}
          >
            <div className="anual-impact">
              <h1 className="font-bold text-xl mb-2">Annual Donation Goal</h1>
              <div className="flex flex-col md:flex-row justify-between text-gray-500 mb-4 gap-2">
                <p className="text-sm md:text-base">
                  You're making a real difference this year!
                </p>
                <p className="font-bold text-brand">$1,250 / $2,000</p>
              </div>

              {/* Responsive Progress Bar */}
              <progress
                value={0.7}
                className="w-full h-3 appearance-none overflow-hidden rounded-full
                           [&::-webkit-progress-bar]:bg-slate-200 
                           [&::-webkit-progress-value]:bg-brand 
                           [&::-moz-progress-bar]:bg-brand"
              />

              {/* Impact Cards: Responsive grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
                <div className="card1 bg-brand transition-all shadow-md hover:shadow-xl p-4 rounded-md min-h-25">
                  <p className="font-bold text-white text-xl mb-1">
                    84 Lives Impacted
                  </p>
                  <p className="text-white text-sm opacity-90">
                    Your contributions have provided education and nutrition to
                    children in need across 3 continents.
                  </p>
                </div>
                <div className="card2 bg-brand shadow-md hover:shadow-xl transition-all p-4 rounded-md min-h-25">
                  <p className="font-bold text-white text-xl mb-1">
                    120 Trees Planted
                  </p>
                  <p className="text-white text-sm opacity-90">
                    Through environmental campaigns, you've helped offset
                    approximately 2.4 tons of carbon annually.
                  </p>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="impact-chart mt-8 border-t pt-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                Donation Activity
              </h3>
              <div className="w-full overflow-hidden bg-gray-50 rounded-xl p-2">
                <DonationActivity />
              </div>
            </div>
          </div>
        </div>
        {/* Stats Ends */}
      </div>
    </div>
  );
};

export default Profile;

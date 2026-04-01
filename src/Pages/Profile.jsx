import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { ImHistory } from "react-icons/im";
import { IoStatsChart, IoAccessibilityOutline } from "react-icons/io5";
import { PiTree } from "react-icons/pi";
import DonationActivity from "../Components/UI/Charts/DonationActivity";
import { Link } from "react-router-dom";
import useAuthStore from "../Zustand/authStore";
import { getUserAvatarUrl, getUserDisplayName } from "../utils/userProfile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("impact");
  const { user } = useAuthStore();

  const displayName = getUserDisplayName(user);
  const profileImage = getUserAvatarUrl(user);

  return (
    <div className="py-10 bg-white relative min-h-screen overflow-x-hidden">
      {/* Brown Header Bar */}
      <div className="bg-[#4A3F35] w-full h-16 absolute top-0"></div>

      {/* Main Container */}
      <div className="relative w-full container mx-auto flex flex-col lg:flex-row gap-6 pt-18 px-4 lg:px-0 items-start">
        {/* Left Side: Profile Card */}
        <div className="wrap rounded-xl border-brand border-4 w-full h-125 lg:w-112.5 flex flex-col items-center pb-8 bg-white shadow-sm relative pt-10 lg:pt-0">
          <p className="text-xl lg:text-2xl font-bold absolute top-4 left-6 text-gray-800 lg:static lg:mb-4 lg:mt-6 lg:w-full lg:px-10">
            Profile
          </p>

          <div className="Usercard w-full p-6 flex gap-2 justify-center items-center flex-col">
            <div className="img_box shadow-lg border-brand border-4 rounded-full p-1 flex items-center justify-center">
              <img
                src={profileImage}
                alt={displayName}
                className="rounded-full w-24 h-24 object-cover"
              />
            </div>

            <h1 className="font-bold text-2xl text-gray-800">
              {displayName}
            </h1>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1 text-gray-500">
                <CiLocationOn className="text-brand text-xl" />
                <p className="font-normal text-lg">New York, WA</p>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Member since January, 2026
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-brand shadow-md text-white px-4 py-3 flex items-center justify-center flex-col rounded-lg">
              <p className="font-bold text-xl">$1.250</p>
              <p className="text-xs uppercase opacity-80">Total Donated</p>
            </div>
            <div className="bg-brand shadow-md text-white px-4 py-3 flex items-center justify-center flex-col rounded-lg">
              <p className="font-bold text-xl">12</p>
              <p className="text-xs uppercase opacity-80">Campaigns</p>
            </div>
          </div>

          <Link
            to="/editprofile"
            className="w-64 h-12 flex items-center justify-center text-white bg-brand hover:brightness-110 rounded-md font-bold transition-all shadow-lg"
          >
            Edit Profile
          </Link>
        </div>

        {/* Right Side: Stats/Impact Section - ডিজাইন অপরিবর্তিত */}
        <div className="stats border-brand border-4 flex flex-col w-full bg-white shadow-sm rounded-xl overflow-hidden">
          {/* Tabs Menu */}
          <div className="flex items-center justify-around h-14 bg-brand text-white">
            <button
              onClick={() => setActiveTab("impact")}
              className={`flex-1 flex gap-2 cursor-pointer font-bold items-center justify-center h-full transition-all ${
                activeTab === "impact"
                  ? "bg-white/10 border-b-4 border-white"
                  : "opacity-70"
              }`}
            >
              <IoStatsChart className="text-lg" />
              <span className="text-sm md:text-base">Impact</span>
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 cursor-pointer flex gap-2 font-bold items-center justify-center h-full transition-all ${
                activeTab === "history"
                  ? "bg-white/10 border-b-4 border-white"
                  : "opacity-70"
              }`}
            >
              <ImHistory className="text-lg" />
              <span className="text-sm md:text-base">History</span>
            </button>

            <button
              onClick={() => setActiveTab("setting")}
              className={`flex-1 cursor-pointer flex gap-2 font-bold items-center justify-center h-full transition-all ${
                activeTab === "setting"
                  ? "bg-white/10 border-b-4 border-white"
                  : "opacity-70"
              }`}
            >
              <FiSettings className="text-lg" />
              <span className="text-sm md:text-base">Setting</span>
            </button>
          </div>

          {/* Impact Content - ডিজাইন অপরিবর্তিত */}
          {activeTab === "impact" && (
            <div className="stats-content p-6 animate-fadeIn">
              <div className="anual-impact">
                <h1 className="font-bold text-xl mb-2">Annual Donation Goal</h1>
                <div className="flex flex-col md:flex-row justify-between text-gray-500 mb-4 gap-2">
                  <p>You're making a real difference this year!</p>
                  <p className="font-bold text-brand">$1,250 / $2,000</p>
                </div>

                <progress
                  value={0.7}
                  className="w-full h-3 appearance-none overflow-hidden rounded-full
                             [&::-webkit-progress-bar]:bg-slate-200 
                             [&::-webkit-progress-value]:bg-brand"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-brand/5 p-6 rounded-xl shadow-sm border border-brand/20 flex gap-4 items-center hover:bg-brand/10 transition-colors">
                    <div className="bg-brand p-3 rounded-xl shadow-md">
                      <IoAccessibilityOutline
                        size={30}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-2xl mb-1">
                        84 Lives Impacted
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Your contributions have provided education and
                        nutrition.
                      </p>
                    </div>
                  </div>

                  <div className="bg-brand/5 p-6 rounded-xl shadow-sm border border-brand/20 flex gap-4 items-center hover:bg-brand/10 transition-colors">
                    <div className="bg-brand p-3 rounded-xl shadow-md">
                      <PiTree size={32} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-2xl mb-1">
                        120 Trees Planted
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        You've helped offset approximately 2.4 tons of carbon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="impact-chart mt-10 border-t pt-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Donation Activity
                </h3>
                <DonationActivity />
              </div>
            </div>
          )}

          {activeTab !== "impact" && (
            <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">
              {activeTab} Content Coming Soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

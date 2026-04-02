import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { ImHistory } from "react-icons/im";
import { IoStatsChart, IoAccessibilityOutline } from "react-icons/io5";
import { PiTree } from "react-icons/pi";
import DonationActivity from "../Components/UI/Charts/DonationActivity";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Zustand/authStore";
import { get, ref as dbRef } from "firebase/database";
import { rtdb } from "../Database/firebase.config";
import { getUserAvatarUrl, getUserDisplayName } from "../utils/userProfile";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("impact");
  const { user, isSuperAdmin, deleteMyAccount } = useAuthStore();
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileMeta, setProfileMeta] = useState({
    address: "",
    createdAt: "",
  });

  const displayName = getUserDisplayName(user);
  const profileImage = getUserAvatarUrl(user);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const loadProfileMeta = async () => {
      try {
        const snap = await get(dbRef(rtdb, `users/${user.uid}`));
        if (!snap.exists()) {
          return;
        }

        const data = snap.val() || {};
        const rawCreatedAt = data.createdAt;
        const dateValue =
          typeof rawCreatedAt === "number"
            ? new Date(rawCreatedAt)
            : rawCreatedAt
              ? new Date(rawCreatedAt)
              : null;
        const createdAt =
          dateValue && !Number.isNaN(dateValue.getTime())
            ? dateValue.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "January, 2026";

        setProfileMeta({
          address: data.address || "",
          createdAt,
        });
      } catch (error) {
        // Keep fallback UI values if profile metadata cannot be loaded.
      }
    };

    loadProfileMeta();
  }, [user?.uid]);

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== "DELETE") {
      toast.error("Type DELETE to confirm account deletion.");
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteMyAccount();
      if (!result?.success) {
        toast.error(result?.message || "Could not delete account.");
        return;
      }

      toast.success("Account deleted successfully.");
      navigate("/login", { replace: true });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-10 bg-white relative min-h-screen overflow-x-hidden">
      <ToastContainer />
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
                <p className="font-normal text-lg">
                  {profileMeta.address || "New York, WA"}
                </p>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Member since {profileMeta.createdAt || "January, 2026"}
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

          {activeTab === "history" && (
            <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">
              {activeTab} Content Coming Soon
            </div>
          )}

          {activeTab === "setting" && (
            <div className="p-6 md:p-8">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <h3 className="text-lg font-bold text-red-700">
                  Delete Account
                </h3>
                <p className="mt-2 text-sm text-red-700/90">
                  This will permanently remove your profile account data.
                </p>

                {isSuperAdmin ? (
                  <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#4A3F35]">
                    Super admin account delete is blocked from settings.
                  </p>
                ) : (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(event) =>
                        setDeleteConfirmText(event.target.value)
                      }
                      placeholder='Type "DELETE" to confirm'
                      className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 outline-none focus:border-red-400"
                    />
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isDeleting ? "Deleting..." : "Delete My Account"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

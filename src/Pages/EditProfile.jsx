import React, { useState } from "react";
import {
  FiCamera,
  FiSave,
  FiArrowLeft,
  FiLock,
  FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Route change korar jonno

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "Russel Abraham",
    email: "russel@example.com",
    phone: "+1 234 567 890",
    address: "New York, WA",
    gender: "Male",
    birthYear: "1995",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    // Data save hoye gele profile page-e firat niye jabe
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg- pb-10">
      {/* Top Navigation Bar */}
      <div className="bg-[#4A3F35] w-full h-16  absolute top-0 "></div>

      <div className="container mx-auto px-4 mt-32">
        <div className="container mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 cursor-pointer hover:bg-white/20 rounded-full transition-all"
          >
            <FiArrowLeft size={24} />
          </button>
          <h1
            onClick={() => navigate("/profile")}
            className=" cursor-pointer text-xl font-bold"
          >
            Edit Profile
          </h1>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSave} className="p-6 md:p-10">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative">
                <img
                  src="/russel.png"
                  className="w-32 h-32 rounded-full border-4 border-[#E87461] object-cover"
                  alt="Profile"
                />
                <label className="absolute bottom-1 right-1 bg-[#E87461] p-2.5 rounded-full text-white cursor-pointer hover:scale-110 transition-all border-2 border-white">
                  <FiCamera size={20} />
                  <input type="file" className="hidden" />
                </label>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#E87461]">
                Change Profile Photo
              </p>
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#E87461] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#E87461] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#E87461] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#E87461] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#E87461] outline-none transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-gray-700">Birth Year</label>
                <input
                  type="number"
                  name="birthYear"
                  value={profile.birthYear}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#E87461] outline-none transition-all"
                />
              </div>
            </div>

            {/* Reset Password Section */}
            <div className="mt-10 p-6 bg-orange-50 rounded-2xl border border-[#E87461]/20">
              <div className="flex items-center gap-2 mb-4 text-[#E87461]">
                <FiLock className="font-bold" />
                <h3 className="font-bold uppercase text-sm">
                  Security Settings
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="font-medium text-gray-700 text-center sm:text-left">
                  Update your account password to keep it secure.
                </p>
                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E87461] text-[#E87461] rounded-xl font-bold hover:bg-[#E87461] hover:text-white transition-all shadow-sm whitespace-nowrap"
                >
                  <FiRefreshCw /> Reset Password
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-10">
              <button
                type="submit"
                className="w-full py-4 bg-[#E87461] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:brightness-110 transition-all"
              >
                <FiSave /> Save All Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

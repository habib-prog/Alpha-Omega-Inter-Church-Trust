import React, { useEffect, useState } from "react";
import {
  FiCamera,
  FiSave,
  FiArrowLeft,
  FiLock,
  FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Route change korar jonno
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../Zustand/authStore";
import { auth, rtdb, storage } from "../Database/firebase.config";
import { updateProfile } from "firebase/auth";
import { get, ref as dbRef, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getUserAvatarUrl, getUserDisplayName } from "../utils/userProfile";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "Male",
    birthYear: "",
    photoURL: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const userSnap = await get(dbRef(rtdb, `users/${user.uid}`));
        const data = userSnap.exists() ? userSnap.val() : {};
        const displayName = data?.name || getUserDisplayName(user);
        const photoURL = data?.photoURL || getUserAvatarUrl(user);

        setProfile({
          name: displayName,
          email: user.email || "",
          phone: data?.phone || "",
          address: data?.address || "",
          gender: data?.gender || "Male",
          birthYear: data?.birthYear || "",
          photoURL,
        });
        setPhotoPreview(photoURL);
      } catch (error) {
        toast.error("Could not load profile.");
      }
    };

    loadProfile();
  }, [user, navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      let nextPhotoURL = profile.photoURL || getUserAvatarUrl(user);

      if (imageFile) {
        const imageRef = ref(
          storage,
          `profile_images/${user.uid}/${Date.now()}-${imageFile.name}`,
        );
        await uploadBytes(imageRef, imageFile);
        nextPhotoURL = await getDownloadURL(imageRef);
      }

      await updateProfile(auth.currentUser, {
        displayName: profile.name,
        photoURL: nextPhotoURL,
      });

      await update(dbRef(rtdb, `users/${user.uid}`), {
        uid: user.uid,
        name: profile.name,
        email: user.email || profile.email,
        phone: profile.phone || "",
        address: profile.address || "",
        gender: profile.gender || "Male",
        birthYear: profile.birthYear || "",
        photoURL: nextPhotoURL,
      });

      await setUser(auth.currentUser);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Could not update profile.");
      return;
    } finally {
      setIsSaving(false);
    }

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg- pb-10">
      <ToastContainer />
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
                  src={photoPreview || getUserAvatarUrl(user)}
                  className="w-32 h-32 rounded-full border-4 border-[#E87461] object-cover"
                  alt="Profile"
                />
                <label className="absolute bottom-1 right-1 bg-[#E87461] p-2.5 rounded-full text-white cursor-pointer hover:scale-110 transition-all border-2 border-white">
                  <FiCamera size={20} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
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
                  readOnly
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
                disabled={isSaving}
                className="w-full py-4 bg-[#E87461] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:brightness-110 transition-all"
              >
                <FiSave /> {isSaving ? "Saving..." : "Save All Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import useAuthStore from "../Zustand/authStore";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../Database/firebase.config"; // db ইমপোর্ট নিশ্চিত করুন
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore ফাংশন

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, authLoading, setUser } = useAuthStore();

  const hanslelogin = async (e) => {
    e.preventDefault();
    const status = await login(email, password);
    if (status.success) {
      const currentUser = auth.currentUser;
      if (currentUser && !currentUser.emailVerified) {
        toast.warn("Please verify your email first!");
        return;
      }
      toast.success("Login Successful");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } else {
      toast.error(status.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestore
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }

      setUser(user);
      toast.success("Google Login Successful");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="h-full hidden md:block">
          <img
            src="/hero.jpeg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative flex justify-center items-center pt-24 p-4 sm:pt-22 bg-brand md:bg-brand bg-[url('/hero.jpeg')] md:bg-none bg-cover bg-center">
          {/* <div className="absolute inset-0 bg-orange-300/60 md:hidden"></div> */}
          <Motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md z-10"
          >
            <section id="back-div" className="rounded-3xl">
              <div className="border-8 border-transparent rounded-xl bg-white/90 backdrop-blur-sm shadow-xl p-6 sm:p-8">
                <h1 className="text-3xl sm:text-5xl font-bold text-center cursor-default text-gray-900 mb-6">
                  Log in
                </h1>
                <form onSubmit={hanslelogin} className="space-y-4 sm:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-lg text-black"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="border p-3 placeholder:text-gray-500 shadow-md    border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-[1.02] duration-300 outline-none"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-lg text-black"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="border p-3 placeholder:text-gray-500 shadow-md    border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-[1.02] duration-300 outline-none"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-start">
                    <a
                      href="#"
                      className="text-blue-400 text-sm transition hover:underline"
                    >
                      Forget your password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className={`w-full p-3 mt-4 text-white bg-[#E87461] font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg ${authLoading ? "animate-pulse" : ""}`}
                  >
                    {authLoading ? "Loging In...." : "Log In"}
                  </button>
                </form>
                <div className="flex flex-col mt-6 text-sm text-center text-brand ">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-400 font-medium transition hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                <div
                  id="third-party-auth"
                  className="flex flex-wrap justify-center gap-3 mt-5"
                >
                  {[
                    {
                      src: "8f25a2ba-bdcf-4ff1-b596-088f330416ef",
                      alt: "Google",
                      onClick: handleGoogleLogin,
                    },
                    {
                      src: "95eebb9c-85cf-4d12-942f-3c40d7044dc6",
                      alt: "LinkedIn",
                    },
                    {
                      src: "6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9",
                      alt: "Facebook",
                    },
                    {
                      src: "82d7ca0a-c380-44c4-ba24-658723e2ab07",
                      alt: "Twitter",
                    },
                  ].map((icon, index) => (
                    <Motion.button
                      key={index}
                      onClick={icon.onClick ? icon.onClick : null}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-gray-50/80  rounded-lg hover:scale-110 transition-transform shadow-md"
                    >
                      <img
                        className="w-5 h-5"
                        loading="lazy"
                        src={`https://ucarecdn.com/${icon.src}/`}
                        alt={icon.alt}
                      />
                    </Motion.button>
                  ))}
                </div>
              </div>
            </section>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

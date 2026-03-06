import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion"; // Importing Framer Motion
import useAuthStore from "../Zustand/authStore";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../Database/firebase.config";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, authLoading } = useAuthStore();

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
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        {/* Left Side: Image (Only for Desktop) */}
        <div className="h-full hidden md:block">
          <img
            src="/hero.jpeg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Form Container */}
        <div className="relative flex justify-center items-center pt-24 p-4 sm:pt-22 bg-orange-300 md:bg-orange-300 bg-[url('/hero.jpeg')] md:bg-none bg-cover bg-center">
          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-orange-300/60 md:hidden"></div>

          {/* Card Container with Motion - Sliding from Left */}
          <Motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md z-10"
          >
            <section id="back-div" className="rounded-3xl">
              <div className="border-8 border-transparent rounded-xl bg-white/90 backdrop-blur-sm dark:bg-gray-900 shadow-xl p-6 sm:p-8">
                <h1 className="text-3xl sm:text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900 mb-6">
                  Log in
                </h1>

                <form
                  action="#"
                  method="post"
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-lg dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-[1.02] duration-300 outline-none"
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
                      className="block mb-2 text-lg dark:text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-[1.02] duration-300 outline-none"
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

                  {authLoading ? (
                    <button
                      className={`w-full p-3 mt-4 text-white bg-[#E87461] font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg  animate-pulse `}
                      onClick={hanslelogin}
                    >
                      Loging In....
                    </button>
                  ) : (
                    <button
                      className={`w-full p-3 mt-4 text-white bg-[#E87461] font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg`}
                      onClick={hanslelogin}
                    >
                      Log In
                    </button>
                  )}
                </form>

                <div className="flex flex-col mt-6 text-sm text-center dark:text-gray-300">
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

                {/* Third Party Icons */}
                <div
                  id="third-party-auth"
                  className="flex flex-wrap justify-center gap-3 mt-5"
                >
                  {[
                    {
                      src: "8f25a2ba-bdcf-4ff1-b596-088f330416ef",
                      alt: "Google",
                    },
                    {
                      src: "95eebb9c-85cf-4d12-942f-3c40d7044dc6",
                      alt: "LinkedIn",
                    },
                    {
                      src: "be5b0ffd-85e8-4639-83a6-5162dfa15a16",
                      alt: "GitHub",
                      invert: true,
                    },
                    {
                      src: "6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9",
                      alt: "Facebook",
                    },
                    {
                      src: "82d7ca0a-c380-44c4-ba24-658723e2ab07",
                      alt: "Twitter",
                    },
                    {
                      src: "3277d952-8e21-4aad-a2b7-d484dad531fb",
                      alt: "Apple",
                    },
                  ].map((icon, index) => (
                    <Motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-gray-50/80 dark:bg-gray-800 rounded-lg hover:scale-110 transition-transform shadow-md"
                    >
                      <img
                        className={`w-5 h-5 ${icon.invert ? "dark:invert" : ""}`}
                        loading="lazy"
                        src={`https://ucarecdn.com/${icon.src}/`}
                        alt={icon.alt}
                      />
                    </Motion.button>
                  ))}
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>
                    By signing in, you agree to our Terms and Privacy Policy.
                  </p>
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

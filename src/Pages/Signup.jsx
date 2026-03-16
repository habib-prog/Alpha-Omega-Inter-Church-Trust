import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion"; // Importing Framer Motion
import useAuthStore from "../Zustand/authStore";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, authLoading } = useAuthStore();
  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await signup(email, password, name);
    result.success && toast.success("Account created");
    result.success &&
      toast.warning(`verification mail sent
      verify mail before login`);
    setName("");
    setEmail("");
    setPassword("");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
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
        {/* Login er motoi exact same padding and alignment */}
        <div className="relative flex justify-center items-center pt-24 p-4 sm:pt-22 bg-brand md:bg-brand bg-[url('/hero.jpeg')] md:bg-none bg-cover bg-center">
          {/* Mobile Overlay */}
          {/* <div className="absolute inset-0 bg-orange-300/60 md:hidden"></div> */}

          {/* Card Container with Motion - Login er motoi Left theke slide hobe */}
          <Motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md z-10"
          >
            <section id="back-div" className="rounded-3xl">
              <div className="border-8 border-transparent rounded-xl bg-white/90 backdrop-blur-sm  shadow-xl p-6 sm:p-8">
                <h1 className="text-3xl sm:text-5xl font-bold text-center cursor-default  text-gray-900 mb-6">
                  Sign Up
                </h1>

                <form
                  action="#"
                  method="post"
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="Name"
                      className="block mb-2 text-lg text-black"
                    >
                      Name
                    </label>
                    <input
                      id="Name"
                      className="border p-3 placeholder:text-gray-500 shadow-md    border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-[1.02] duration-300 outline-none"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </div>
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
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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

                  {authLoading ? (
                    <button
                      className={`w-full p-3 mt-4 text-white bg-[#E87461] font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg  animate-pulse `}
                      onClick={handleSignup}
                    >
                      Signing Up....
                    </button>
                  ) : (
                    <button
                      className={`w-full p-3 mt-4 text-white bg-[#E87461] font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg`}
                      onClick={handleSignup}
                    >
                      Sign Up
                    </button>
                  )}
                </form>

                <div className="flex flex-col mt-6 text-sm text-center text-brand">
                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-400 font-medium transition hover:underline"
                    >
                      Log In
                    </Link>
                  </p>
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

export default Signup;

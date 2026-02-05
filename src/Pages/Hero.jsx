import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section>
      <div className="w-full h-full pb-130 pt-25 max-h-72 sm:pt-35 sm:pb-135 bg-cover bg-center bg-no-repeat  bg-[url('/slum.jpg')] ">
        <div className="container-custom">
          <div className="max-w-210 m-auto">
            <div className="flex flex-col ">
              <p className=" m-auto inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-md text-sm font-medium mb-6 border border-white/30  ">
                Non-profit Organization
              </p>
              <h1 className=" text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center mb-6">
                Every Act of Kindness
                <span className="block text-[#F4A261]">
                  Creates Ripples of Hope
                </span>
              </h1>
              <p className=" text-xl sm:text-2xl font-light text-white/90 mb-10 max-w-2xl mx-auto text-center font-raleway">
                Join our global community of changemakers. Your generosity
                transforms lives and builds a brighter future for everyone.
              </p>
              <div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className=" bg-[#E87461] hover:bg-[#D66350] hover:scale-102 duration-300 pulse-btn  text-white text-xl px-12 py-3  rounded-full cursor-pointer ">
                    <button>Donate Now</button>
                  </div>
                  <div className="  text-white text-xl px-8 py-3 border-2 duration-300 hover:bg-white/20 hover:scale-102  rounded-full cursor-pointer">
                    <Link to="/mission" className="flex">
                      Our Mission{" "}
                      <IoIosArrowRoundForward className="text-3xl" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

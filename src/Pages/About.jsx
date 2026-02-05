import React from "react";
import { BsPeople } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";

const About = () => {
  return (
    <section id="about" className="sm:py-24 py-10 bg-[#FAF8F3]">
      <div className="container-custom">
        <div>
          <div className="grid lg:grid-cols-2 gap-7 items-center">
            <div>
              <h2 className=" text-2xl sm:text-3xl lg:text-4xl font-bold text-unique mb-6">
                We believe in the power of community to change lives.
              </h2>
              <p className="text-lg max-w-5xl text-unique/80 mb-6 leading-6">
                Founded on the belief that everyone deserves a chance at a
                better life, KindredHearts has been working tirelessly to bridge
                the gap between those who want to help and those in need.
              </p>
              <p className="text-lg max-w-5xl text-unique/80 mb-8 leading-6">
                Our approach is simple yet profound: we listen to communities,
                understand their unique challenges, and work alongside them to
                build sustainable solutions that last for generations.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <BsPeople className="text-4xl text-brand" />
                  <p className="text-3xl font-bold text-unique">50k+</p>
                  <p className="text-sm font-medium text-unique/60">
                    Lives Impacted
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <CiGlobe className="text-4xl text-[#8BA88E]" />
                  <p className="text-3xl font-bold text-unique">12</p>
                  <p className="text-sm font-medium text-unique/60">
                    Countries Served
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <FaRegHeart className="text-4xl text-[#F4A261]" />
                  <p className="text-3xl font-bold text-unique">100%</p>
                  <p className="text-sm font-medium text-unique/60">
                    Donation Impact
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <LuSparkles className="text-4xl text-[#4B443D]" />
                  <p className="text-3xl font-bold text-unique">50k+</p>
                  <p className="text-sm font-medium text-unique/60">
                    Lives Impacted
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <img
                src="/aboutus-1.png"
                alt=""
                className="rounded-3xl w-full h-46 sm:h-64 object-cover shadow-lg  translate-y-8"
              />
              <img
                src="/aboutus-2.png"
                alt=""
                className="rounded-3xl w-full h-46 sm:h-64 object-cover shadow-lg "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

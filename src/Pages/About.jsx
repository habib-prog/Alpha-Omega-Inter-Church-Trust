// import React from "react";
// import { BsPeople } from "react-icons/bs";
// import { CiGlobe } from "react-icons/ci";
// import { FaRegHeart } from "react-icons/fa";
// import { LuSparkles } from "react-icons/lu";
// import Poverty from "../Components/UI/Charts/Poverty";
// import Radarp from "../Components/UI/Charts/Radarp";
// import FemaleEducationChart from "../Components/UI/Charts/FemaleEducationChart";
// import ChildStatistics from "../Components/UI/Charts/ChildStatistics";
// import StreetChildReason from "../Components/UI/Charts/StreetChildReason";
// import HolisticCareChart from "../Components/UI/Charts/HolisticCareChart";

// const About = () => {
//   return (
//     <section id="about" className="sm:py-24 py-10 bg-[#FAF8F3]">
//       <div className="container">
//         <div>
//           <div className="grid lg:grid-cols-2 gap-7 items-center">
//             <div>
//               <h2 className=" text-2xl sm:text-3xl lg:text-4xl font-bold text-unique mb-6">
//                 We believe in the power of community to change lives.
//               </h2>
//               <p className="text-lg max-w-5xl text-unique/80 mb-6 leading-6">
//                 Founded on the belief that everyone deserves a chance at a
//                 better life, KindredHearts has been working tirelessly to bridge
//                 the gap between those who want to help and those in need.
//               </p>
//               <p className="text-lg max-w-5xl text-unique/80 mb-8 leading-6">
//                 Our approach is simple yet profound: we listen to communities,
//                 understand their unique challenges, and work alongside them to
//                 build sustainable solutions that last for generations.
//               </p>
//               <div className="grid grid-cols-2 gap-8">
//                 <div className="flex flex-col gap-2">
//                   <BsPeople className="text-4xl text-brand" />
//                   <p className="text-3xl font-bold text-unique">50k+</p>
//                   <p className="text-sm font-medium text-unique/60">
//                     Lives Impacted
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <CiGlobe className="text-4xl text-[#8BA88E]" />
//                   <p className="text-3xl font-bold text-unique">12</p>
//                   <p className="text-sm font-medium text-unique/60">
//                     Countries Served
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <FaRegHeart className="text-4xl text-[#F4A261]" />
//                   <p className="text-3xl font-bold text-unique">100%</p>
//                   <p className="text-sm font-medium text-unique/60">
//                     Donation Impact
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <LuSparkles className="text-4xl text-[#4B443D]" />
//                   <p className="text-3xl font-bold text-unique">50k+</p>
//                   <p className="text-sm font-medium text-unique/60">
//                     Lives Impacted
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 ">
//               <img
//                 src="/aboutus-1.png"
//                 alt=""
//                 className="rounded-3xl w-full h-46 sm:h-64 object-cover shadow-lg  translate-y-8"
//               />
//               <img
//                 src="/aboutus-2.png"
//                 alt=""
//                 className="rounded-3xl w-full h-46 sm:h-64 object-cover shadow-lg "
//               />
//             </div>
//           </div>
//         </div>
//         <div className="info sm:py-4 mt-12 text-center ">
//           <div className="info-text flex flex-col gap-2">
//             <h2 className="sm:text-3xl text-xl font-bold text-[#E87461]">
//               Understanding the Challenges in Bangladesh
//             </h2>
//             <p className="text-unique text-sm">
//               Bangladesh faces complex challenges in education, nutrition, and
//               women’s empowerment, affecting millions of children and families.
//               From high school dropout rates and child stunting to widespread
//               poverty and anemia among women, the statistics reveal the urgent
//               need for sustainable solutions. The charts and infographics below
//               provide a clear snapshot of these challenges, helping us and our
//               supporters visualize the areas where focused action can make the
//               greatest impact.
//             </p>
//           </div>

//           {/* Infograph Card Section started */}
//           <div className="info-graph-card01  grid grid-col-1 sm:grid-cols-3">
//             <Poverty />
//             <Radarp />
//             <FemaleEducationChart />
//             <ChildStatistics />
//             <StreetChildReason />
//             <HolisticCareChart />
//           </div>
//           {/* Infograph Card Section ended */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;

import React from "react";
import { BsPeople } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { motion as Motion } from "framer-motion";

import Poverty from "../Components/UI/Charts/Poverty";
import Radarp from "../Components/UI/Charts/Radarp";
import FemaleEducationChart from "../Components/UI/Charts/FemaleEducationChart";
import ChildStatistics from "../Components/UI/Charts/ChildStatistics";
import StreetChildReason from "../Components/UI/Charts/StreetChildReason";
import HolisticCareChart from "../Components/UI/Charts/HolisticCareChart";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="about" className="sm:py-24 py-10 bg-[#FAF8F3] overflow-hidden">
      <div className="container">
        <div>
          <div className="grid lg:grid-cols-2 gap-7 items-center">
            {/* Left Content with Slide In animation */}
            <Motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-unique mb-6">
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

              {/* Stats Section with Stagger effect */}
              <div className="grid grid-cols-2 gap-8">
                {[
                  {
                    icon: <BsPeople />,
                    count: "50k+",
                    label: "Lives Impacted",
                    color: "text-brand",
                  },
                  {
                    icon: <CiGlobe />,
                    count: "12",
                    label: "Countries Served",
                    color: "text-[#8BA88E]",
                  },
                  {
                    icon: <FaRegHeart />,
                    count: "100%",
                    label: "Donation Impact",
                    color: "text-[#F4A261]",
                  },
                  {
                    icon: <LuSparkles />,
                    count: "50k+",
                    label: "Expert Volunteers",
                    color: "text-[#4B443D]",
                  },
                ].map((stat, index) => (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col gap-2"
                  >
                    <div className={`text-4xl ${stat.color}`}>{stat.icon}</div>
                    <p className="text-3xl font-bold text-unique">
                      {stat.count}
                    </p>
                    <p className="text-sm font-medium text-unique/60">
                      {stat.label}
                    </p>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>

            {/* Right Images with Animation */}
            <Motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/aboutus-1.png"
                alt="About Us"
                className="rounded-3xl w-full h-46 sm:h-64 object-cover shadow-lg translate-y-8 hover:translate-y-4 duration-500"
              />
              <img
                src="/aboutus-2.png"
                alt="About Us"
                className="rounded-3xl w-full h-46 sm:h-64 object-cover shadow-lg hover:-translate-y-4 duration-500"
              />
            </Motion.div>
          </div>
        </div>

        {/* Lower Info Section */}
        <div className="info sm:py-4 mt-20 text-center ">
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="info-text flex flex-col gap-2 mb-12"
          >
            <h2 className="sm:text-3xl text-xl font-bold text-[#E87461]">
              Understanding the Challenges in Bangladesh
            </h2>
            <p className="text-unique text-sm max-w-4xl mx-auto">
              Bangladesh faces complex challenges in education, nutrition, and
              women’s empowerment, affecting millions of children and families.
              The charts below provide a clear snapshot of these challenges.
            </p>
          </Motion.div>

          {/* Charts with Stagger Animation */}
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="info-graph-card01 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              Poverty,
              Radarp,
              FemaleEducationChart,
              ChildStatistics,
              StreetChildReason,
              HolisticCareChart,
            ].map((Chart, index) => (
              <Motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-4 rounded-2xl shadow-sm"
              >
                <Chart />
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

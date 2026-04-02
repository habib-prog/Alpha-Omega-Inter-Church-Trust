// import React from "react";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { Link } from "react-router";

// const Hero = () => {
//   return (
//     <section>
//       <div className="w-full h-full pb-130 pt-25 max-h-72 sm:pt-35 sm:pb-135 bg-cover bg-center bg-no-repeat  bg-[url('/slum.jpg')] ">
//         <div className="container">
//           <div className="max-w-210 m-auto">
//             <div className="flex flex-col ">
//               <p className=" m-auto inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-md text-sm font-medium mb-6 border border-white/30  ">
//                 Non-profit Organization
//               </p>
//               <h1 className=" text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center mb-6">
//                 Every Act of Kindness
//                 <span className="block text-[#F4A261]">
//                   Creates Ripples of Hope
//                 </span>
//               </h1>
//               <p className=" text-xl sm:text-2xl font-light text-white/90 mb-10 max-w-2xl mx-auto text-center font-raleway">
//                 Join our global community of changemakers. Your generosity
//                 transforms lives and builds a brighter future for everyone.
//               </p>
//               <div>
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                   <div className=" bg-[#E87461] hover:bg-[#D66350] hover:scale-102 duration-300 pulse-btn  text-white text-xl px-12 py-3  rounded-full cursor-pointer ">
//                     <button>Donate Now</button>
//                   </div>
//                   <div className="  text-white text-xl px-8 py-3 border-2 duration-300 hover:bg-white/20 hover:scale-102  rounded-full cursor-pointer">
//                     <Link to="/mission" className="flex">
//                       Our Mission{" "}
//                       <IoIosArrowRoundForward className="text-3xl" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion"; // ← Aliased as Motion
import { useSiteContent } from "../data/useSiteContent";

const Hero = () => {
  const navigate = useNavigate();
  const heroContent = useSiteContent("home-hero", "/content/home-hero.json", {
    badge: "Non-profit Organization",
    notice: "This website is under ongoing development by BytNext",
    noticeLinkText: "BytNext",
    noticeLink: "https://www.bytnext.com",
    title: "Every Act of Kindness",
    highlight: "Creates Ripples of Hope",
    description:
      "Join our global community of changemakers. Your generosity transforms lives and builds a brighter future for everyone.",
    backgroundImage: "/slum.jpg",
    primaryButtonText: "Donate Now",
    primaryButtonLink: "/donation",
    secondaryButtonText: "Our Mission",
    secondaryButtonLink: "/mission",
  });
  // Parent container – only for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Individual item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-[80vh] lg:min-h-screen">
      <div
        className="
          absolute inset-0 bg-cover bg-center bg-no-repeat
          after:absolute after:inset-0 after:bg-black/45
        "
        style={{ backgroundImage: `url('${heroContent.backgroundImage}')` }}
      />
      <div className="relative container mx-auto px-5 py-20 sm:py-28 lg:py-32 flex items-center justify-center min-h-[80vh] lg:min-h-screen">
        <Motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Motion.div variants={itemVariants}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/15 text-white backdrop-blur-md text-sm font-medium mb-6 border border-white/25">
              {heroContent.badge}
            </span>
          </Motion.div>
          <Motion.div variants={itemVariants}></Motion.div>

          <Motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
          >
            {heroContent.title}
            <span className="block text-[#F4A261] mt-2">
              {heroContent.highlight}
            </span>
          </Motion.h1>

          <Motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl font-light text-white/90 mb-10 max-w-3xl mx-auto"
          >
            {heroContent.description}
          </Motion.p>

          <Motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(heroContent.primaryButtonLink)}
                className="
        bg-[#E87461] hover:bg-[#d45a4a] 
        text-white text-lg sm:text-xl 
        px-10 sm:px-12 py-3.5 sm:py-4 
        rounded-full font-medium
        transition-colors duration-300 shadow-lg
      "
              >
                {heroContent.primaryButtonText}
              </Motion.button>

              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to={heroContent.secondaryButtonLink}
                  className="
                    inline-flex items-center gap-2
                    text-white text-lg sm:text-xl font-medium
                    border-2 border-white/60 hover:border-white
                    px-8 sm:px-10 py-3.5 sm:py-4 
                    rounded-full
                    transition-all duration-300 backdrop-blur-sm
                  "
                >
                  {heroContent.secondaryButtonText}
                  <IoIosArrowRoundForward className="text-3xl" />
                </Link>
              </Motion.div>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;

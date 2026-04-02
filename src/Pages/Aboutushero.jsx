import React from "react";
import { useSiteContent } from "../data/useSiteContent";

const Aboutushero = () => {
  const aboutContent = useSiteContent("about-page", "/content/about-page.json", {
    heroBadge: "ESTABLISHED 2018",
    heroTitle: "Why We Do",
    heroHighlight: "What We Do",
    heroDescription:
      "Our mission is to ensure that every child, regardless of their background, has access to the resources, love, and opportunities they need to reach their full potential.",
    heroImage: "/aboutus_hero.jpg",
    heroButtons: [
      { label: "Our Journey", link: "/mission" },
      { label: "Our Vision", link: "/mission" },
    ],
  });

  return (
    <section>
      <div
        className=" w-full h-full pb-130 pt-25 max-h-72 sm:pt-35 sm:pb-135 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url('${aboutContent.heroImage}')` }}
      >
        <div className="container">
          <div className="max-w-210 m-auto">
            <div className="flex flex-col ">
              <p className=" m-auto inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-md text-sm font-medium mb-3 sm:mb-6 border border-white/30  ">
                {aboutContent.heroBadge}
              </p>
              <h1 className=" text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center sm:mb-6">
                {aboutContent.heroTitle}
                <span className="block text-[#F4A261]">
                  {aboutContent.heroHighlight}
                </span>
              </h1>
              <p className=" text-xl sm:text-2xl font-light text-white/90 mb-5  sm:mb-10 max-w-2xl mx-auto text-center font-raleway">
                {aboutContent.heroDescription}
              </p>
              {/* Hero buttons removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutushero;

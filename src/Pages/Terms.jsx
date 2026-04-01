import React from "react";
import { motion as Motion } from "framer-motion";
import { useSiteContent } from "../data/useSiteContent";

const Terms = () => {
  const termsContent = useSiteContent("terms-page", "/content/terms-page.json", {
    pageTitle: "Terms & Conditions",
    pageDescription:
      "Please review the terms that govern your use of the Alpha Omega Inter Church Trust website, donations, and related services.",
    sections: [],
  });

  return (
    <section className="bg-[#FAF8F3] px-4 py-24 sm:px-6">
      <div className="container max-w-5xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
          <p className="inline-flex rounded-full bg-[#FCE6DE] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#A54F3C]">
            Terms
          </p>
          <h1 className="mt-5 text-4xl font-bold text-[#4A3F35] sm:text-5xl">
            {termsContent.pageTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-[#6E625A]">
            {termsContent.pageDescription}
          </p>

          <div className="mt-10 space-y-6">
            {termsContent.sections?.map((section, index) => (
              <Motion.article
                key={`${section.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-[#E7DED3] bg-[#FFFCF8] p-6"
              >
                <h2 className="text-2xl font-bold text-[#4A3F35]">
                  {section.title}
                </h2>
                <p className="mt-3 text-[#6E625A]">{section.content}</p>
              </Motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;

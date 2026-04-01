import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useSiteContent } from "../data/useSiteContent";

const NewsLetters = () => {
  const newsletterContent = useSiteContent(
    "newsletters-page",
    "/content/newsletters-page.json",
    {
    badge: "News Letters",
    title:
      "Follow the stories, updates, and field highlights behind every act of care.",
    description:
      "Explore recent updates from Alpha Omega Inter Church Trust and see how campaigns, volunteers, and community partnerships are creating measurable impact.",
    primaryButtonText: "Support the Mission",
    primaryButtonLink: "/donation",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
    asideBadge: "Why It Matters",
    asideTitle:
      "Clear updates help supporters stay connected to real outcomes.",
    asideDescription:
      "This section gives visitors a simple place to check recent activity, campaign highlights, and community milestones without needing to search across the site.",
    featuredFocusBadge: "Featured Focus",
    featuredFocusText:
      "Volunteer spotlights, donation updates, and project progress in one place.",
    asideButtonText: "Visit About Us",
    asideButtonLink: "/about",
      items: [],
    }
  );

  return (
    <section
      id="newsletters"
      className="bg-[#FAF8F3] text-[#4A3F35] pb-18 sm:pb-24"
    >
      <div className="bg-[#4A3F35] pb-6 pt-10 shadow-sm sm:pt-10"></div>
      <div className="container mt-8">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#4A3F35] via-[#6B5547] to-[#A85F48] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14"
        >
          <div className="absolute -right-8 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#F4A261]/20 blur-2xl" />

          <div className="relative max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium tracking-[0.2em] uppercase">
              {newsletterContent.badge}
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              {newsletterContent.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
              {newsletterContent.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to={newsletterContent.primaryButtonLink}
                className="inline-flex items-center justify-center rounded-full bg-[#E87461] px-6 py-3 font-medium text-white transition hover:bg-[#d66350]"
              >
                {newsletterContent.primaryButtonText}
              </Link>
              <Link
                to={newsletterContent.secondaryButtonLink}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 font-medium text-white/95 transition hover:bg-white/10"
              >
                {newsletterContent.secondaryButtonText}
                <IoIosArrowRoundForward className="text-2xl" />
              </Link>
            </div>
          </div>
        </Motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-6">
            {newsletterContent.items?.map((item, index) => (
              <Motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 * index }}
                className="rounded-[1.75rem] border border-[#E7DED3] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#FCE6DE] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#A54F3C]">
                    {item.category}
                  </span>
                  <span className="text-sm text-[#6E625A]">{item.month}</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold">{item.title}</h2>
                <p className="mt-3 max-w-2xl text-[#6E625A]">{item.summary}</p>
                <div className="mt-5">
                  <Link
                    to="/donation"
                    className="inline-flex items-center gap-2 font-medium text-[#E87461] transition hover:text-[#c95e4d]"
                  >
                    Continue the impact
                    <IoIosArrowRoundForward className="text-2xl" />
                  </Link>
                </div>
              </Motion.article>
            ))}
          </div>

          <Motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="rounded-[1.75rem] border border-[#E7DED3] bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E87461]">
              {newsletterContent.asideBadge}
            </p>
            <h3 className="mt-3 text-2xl font-bold">
              {newsletterContent.asideTitle}
            </h3>
            <p className="mt-4 text-[#6E625A]">
              {newsletterContent.asideDescription}
            </p>

            <div className="mt-8 rounded-3xl bg-[#F7EFE7] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A54F3C]">
                {newsletterContent.featuredFocusBadge}
              </p>
              <p className="mt-3 text-lg font-semibold">
                {newsletterContent.featuredFocusText}
              </p>
            </div>

            <div className="mt-8">
              <Link
                to={newsletterContent.asideButtonLink}
                className="inline-flex items-center gap-2 rounded-full border border-[#E87461] px-5 py-3 font-medium text-[#E87461] transition hover:bg-[#E87461] hover:text-white"
              >
                {newsletterContent.asideButtonText}
                <IoIosArrowRoundForward className="text-2xl" />
              </Link>
            </div>
          </Motion.aside>
        </div>
      </div>
    </section>
  );
};

export default NewsLetters;

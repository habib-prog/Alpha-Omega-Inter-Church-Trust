import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useSiteContent } from "../data/useSiteContent";

const SponsorChild = () => {
  const [showAllCards, setShowAllCards] = useState(false);
  const content = useSiteContent(
    "sponsor-child-page",
    "/content/sponsor-child-page.json",
    {
      badge: "Sponsor A Child",
      title: "Stand beside one child and help shape a safer future.",
      description:
        "Child sponsorship helps provide consistent education support, nutrition, healthcare referrals, and emotional care through trusted local partnerships.",
      primaryButtonText: "Start Sponsoring",
      primaryButtonLink: "/donation",
      secondaryButtonText: "Talk To Our Team",
      secondaryButtonLink: "/#contact",
      impactBadge: "Your Monthly Impact",
      impactTitle: "Steady support creates real, long-term change.",
      impactDescription:
        "Your sponsorship contributes to school supplies, health checkups, and family support planning so each child can grow with dignity.",
      sponsorCards: [
        {
          photo: "/uploads/479726358_1119903549674241_704109988213019538_n.jpg",
          childName: "Rahim Uddin",
          age: "9",
          religion: "Islam",
          address: "Sreepur, Gazipur",
          schoolName: "Sreepur Government Primary School",
          sponsorLink: "/donation",
        },
        {
          photo: "/female.png",
          childName: "Maya Rani",
          age: "11",
          religion: "Hindu",
          address: "Kaliakoir, Gazipur",
          schoolName: "Kaliakoir Girls High School",
          sponsorLink: "/donation",
        },
        {
          photo: "/user.webp",
          childName: "David Das",
          age: "10",
          religion: "Christian",
          address: "Tongi, Gazipur",
          schoolName: "Tongi Mission School",
          sponsorLink: "/donation",
        },
        {
          photo: "/user.jpeg",
          childName: "Nusrat Jahan",
          age: "8",
          religion: "Islam",
          address: "Mymensingh Sadar, Mymensingh",
          schoolName: "Shishu Kalyan Primary School",
          sponsorLink: "/donation",
        },
        {
          photo: "/user.png",
          childName: "Rimon Sarkar",
          age: "12",
          religion: "Hindu",
          address: "Baniachang, Habiganj",
          schoolName: "Baniachang Government High School",
          sponsorLink: "/donation",
        },
      ],
      processTitle: "How Sponsorship Works",
      processSteps: [
        "Choose a sponsorship amount that fits your capacity.",
        "Our team aligns your support with current child-focused needs.",
        "Receive updates and stories showing the progress your support enables.",
      ],
    },
  );

  const sponsorCards = content.sponsorCards || [];
  const hasMoreCards = sponsorCards.length > 4;
  const visibleCards = showAllCards ? sponsorCards : sponsorCards.slice(0, 4);

  return (
    <section className="bg-[#FAF8F3] text-[#4A3F35] pb-18 sm:pb-24">
      <div className="bg-[#4A3F35] pb-6 pt-10  shadow-sm sm:pt-10"></div>

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
              {content.badge}
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to={content.primaryButtonLink}
                className="inline-flex items-center justify-center rounded-full bg-[#E87461] px-6 py-3 font-medium text-white transition hover:bg-[#d66350]"
              >
                {content.primaryButtonText}
              </Link>
              <Link
                to={content.secondaryButtonLink}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 font-medium text-white/95 transition hover:bg-white/10"
              >
                {content.secondaryButtonText}
                <IoIosArrowRoundForward className="text-2xl" />
              </Link>
            </div>
          </div>
        </Motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {visibleCards.map((item, index) => (
              <Motion.article
                key={`${item.childName}-${index}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="overflow-hidden rounded-[1.75rem] border border-[#E7DED3] bg-white shadow-sm"
              >
                <div className="flex flex-col gap-5 p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#F4D7CD] bg-[#F7EFE7] shadow-sm sm:h-28 sm:w-28">
                      <img
                        src={item.photo || "/user.png"}
                        alt={item.childName || "Child photo"}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-[#4A3F35]">
                      {item.childName || "Unnamed Child"}
                    </h2>
                  </div>

                  <dl className="grid gap-3 text-sm text-[#6E625A]">
                    <div className="flex items-start gap-2 border-b border-[#F0E7DD] pb-2">
                      <dt className="min-w-24 font-semibold text-[#4A3F35]">
                        Age
                      </dt>
                      <dd>{item.age || "-"}</dd>
                    </div>
                    <div className="flex items-start gap-2 border-b border-[#F0E7DD] pb-2">
                      <dt className="min-w-24 font-semibold text-[#4A3F35]">
                        Religion
                      </dt>
                      <dd>{item.religion || "-"}</dd>
                    </div>
                    <div className="flex items-start gap-2 border-b border-[#F0E7DD] pb-2">
                      <dt className="min-w-24 font-semibold text-[#4A3F35]">
                        Address
                      </dt>
                      <dd>{item.address || "-"}</dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <dt className="min-w-24 font-semibold text-[#4A3F35]">
                        School
                      </dt>
                      <dd>{item.schoolName || "-"}</dd>
                    </div>
                  </dl>

                  <Link
                    to={item.sponsorLink || "/donation"}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#E87461] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d66350]"
                  >
                    Sponsor Now
                  </Link>
                </div>
              </Motion.article>
            ))}

            {hasMoreCards ? (
              <button
                type="button"
                onClick={() => setShowAllCards((prev) => !prev)}
                className="rounded-full border border-[#E87461] px-5 py-2.5 text-sm font-semibold text-[#E87461] transition hover:bg-[#E87461] hover:text-white"
              >
                {showAllCards ? "View Less" : "Show More"}
              </button>
            ) : null}
          </div>

          <Motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="self-start h-fit rounded-[1.75rem] border border-[#E7DED3] bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E87461]">
              {content.impactBadge}
            </p>
            <h3 className="mt-3 text-2xl font-bold">{content.impactTitle}</h3>
            <p className="mt-4 text-[#6E625A]">{content.impactDescription}</p>

            <div className="mt-8 rounded-3xl bg-[#F7EFE7] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A54F3C]">
                {content.processTitle}
              </p>
              <ul className="mt-3 grid gap-3 text-[#4A3F35]">
                {content.processSteps?.map((step) => (
                  <li
                    key={step}
                    className="rounded-2xl bg-white px-4 py-3 text-sm"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link
                to={content.primaryButtonLink}
                className="inline-flex items-center gap-2 rounded-full border border-[#E87461] px-5 py-3 font-medium text-[#E87461] transition hover:bg-[#E87461] hover:text-white"
              >
                {content.primaryButtonText}
                <IoIosArrowRoundForward className="text-2xl" />
              </Link>
            </div>
          </Motion.aside>
        </div>
      </div>
    </section>
  );
};

export default SponsorChild;

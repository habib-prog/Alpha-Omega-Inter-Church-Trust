import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useSiteContent } from "../data/useSiteContent";

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);
  const galleryContent = useSiteContent(
    "gallery-page",
    "/content/gallery-page.json",
    {
      badge: "Event Gallery",
      title: "Moments from our recent community events",
      description:
        "Explore snapshots from outreach programs, school activities, relief distribution, and volunteer-led support events.",
      items: [
        {
          image: "/slum.jpg",
          eventName: "Winter Relief Distribution",
          shortDescription:
            "Families received warm clothing, blankets, and dry food packs before winter.",
        },
        {
          image: "/cleanwater.jpg",
          eventName: "School Supplies Drive",
          shortDescription:
            "Children received notebooks, bags, and learning kits for the new school term.",
        },
        {
          image: "/donate.jpg",
          eventName: "Community Health Camp",
          shortDescription:
            "Volunteer doctors provided health screenings and basic medicines for local families.",
        },
      ],
    },
  );
  const galleryItems = galleryContent.items || [];
  const hasMoreThanThree = galleryItems.length > 3;
  const visibleItems = showAll ? galleryItems : galleryItems.slice(0, 3);

  return (
    <section className="bg-[#FAF8F3] text-[#4A3F35] pb-18 sm:pb-24">
      <div className="bg-[#4A3F35] pb-6 pt-10 shadow-sm sm:pt-10"></div>

      <div className="container mt-8">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-4xl bg-linear-to-br from-[#4A3F35] via-[#6B5547] to-[#A85F48] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14"
        >
          <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium tracking-[0.2em] uppercase">
            {galleryContent.badge}
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            {galleryContent.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            {galleryContent.description}
          </p>
        </Motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <Motion.article
              key={`${item.eventName}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="overflow-hidden rounded-[1.75rem] border border-[#E7DED3] bg-white shadow-sm"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F7EFE7]">
                <img
                  src={item.image || "/user.png"}
                  alt={item.eventName || "Gallery image"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-[#4A3F35]">
                  {item.eventName || "Untitled Event"}
                </h2>
                <p className="mt-3 text-sm text-[#6E625A]">
                  {item.shortDescription || "No description available."}
                </p>
              </div>
            </Motion.article>
          ))}
        </div>

        {hasMoreThanThree ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-[#E87461] px-5 py-2.5 text-sm font-semibold text-[#E87461] transition hover:bg-[#E87461] hover:text-white"
            >
              {showAll ? "View Less" : "Show More"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Gallery;

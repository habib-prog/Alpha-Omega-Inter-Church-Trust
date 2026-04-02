import React from "react";
import { BsTransparency } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";
import TestimonialCard from "../Components/TestimonialCard";
import { useSiteContent } from "../data/useSiteContent";

const CoreValues = () => {
  const aboutContent = useSiteContent("about-page", "/content/about-page.json", {
    coreValuesBadge: "Christ-Centered Service",
    coreValuesTitle: "Our Core Values",
    coreValuesDescription:
      "We serve as a Christian charity by following Biblical principles of love, integrity, and faithful stewardship in every community we support.",
    coreValues: [
      {
        icon: "compassion",
        title: "Christ-Centered Compassion",
        description:
          "We follow Jesus by caring for children and families with dignity, mercy, and practical love.",
      },
      {
        icon: "stewardship",
        title: "Faithful Stewardship",
        description:
          "We treat every donation as a sacred trust and use resources transparently for meaningful impact.",
      },
      {
        icon: "service",
        title: "Servant Leadership",
        description:
          "We lead by serving others first, listening to community needs, and acting with humility.",
      },
      {
        icon: "unity",
        title: "Unity in the Body of Christ",
        description:
          "We partner with churches, volunteers, and families to reflect God's love together.",
      },
    ],
    engageBadge: "Non-profit Organization",
    engageTitle: "Become a Volunteer",
    engageDescription:
      "Your time is the most valuable gift you can give. Join our dedicated team and help us bring sustainable change to communities that need it most. Every hour you contribute creates a ripple effect of hope.",
    engageEmail: "xavierjames701@gmail.com",
    engageButtonText: "Engage With Us",
    engageMailSubject: "Engage with us",
    engageMailBody: "Hi, I would like to connect with you.",
  });

  const handleClick = () => {
    const to = aboutContent.engageEmail || "xavierjames701@gmail.com";
    const subject = aboutContent.engageMailSubject || "Engage with us";
    const body =
      aboutContent.engageMailBody || "Hi, I would like to connect with you.";

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  const coreValues =
    Array.isArray(aboutContent.coreValues) && aboutContent.coreValues.length
      ? aboutContent.coreValues
      : [];

  const firstDescription =
    coreValues[0]?.description ||
    "We follow Jesus by caring for children and families with dignity, mercy, and practical love.";
  const secondDescription =
    coreValues[1]?.description ||
    "We treat every donation as a sacred trust and use resources transparently for meaningful impact.";
  const thirdDescription =
    coreValues[2]?.description ||
    "We lead by serving others first, listening to community needs, and acting with humility.";
  const fourthDescription =
    coreValues[3]?.description ||
    "We partner with churches, volunteers, and families to reflect God's love together.";

  return (
    <>
      <section>
        <div className='container'>
          <div className='text-center '>
            <h2 className='font-bold text-3xl'>Our Core Values</h2>
            <p className='text-xl pt-2 text-unique'>
              The principles that guide every decision we make.
            </p>
          </div>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12'>
            <div className='p-6 flex flex-col bg-gray-50 justify-center items-center rounded-2xl shadow-xl'>
              <LuHeartHandshake className=' w-10 max-w-10 h-10 max-h-10 text-brand' />
              <h4 className='text-lg font-bold text-slate-900 my-2'>
                Compassion
              </h4>
              <p className='text-unique font-normal text-sm'>
                {firstDescription}
              </p>
            </div>
            <div className='p-6 flex flex-col bg-gray-50 justify-center items-center rounded-2xl shadow-xl'>
              <BsTransparency className=' w-10 max-w-10 h-10 max-h-10 text-brand' />
              <h4 className='text-lg font-bold text-slate-900 my-2'>
                Transparency
              </h4>
              <p className='text-unique font-normal text-sm'>
                {secondDescription}
              </p>
            </div>
            <div className='p-6 flex flex-col bg-gray-50 justify-center items-center rounded-2xl shadow-xl'>
              <FaPeopleRoof className=' w-10 max-w-10 h-10 max-h-10 text-brand' />
              <h4 className='text-lg font-bold text-slate-900 my-2'>
                Service
              </h4>
              <p className='text-unique font-normal text-sm'>
                {thirdDescription}
              </p>
            </div>
            <div className='p-6 flex flex-col bg-gray-50 justify-center items-center rounded-2xl shadow-xl'>
              <LuHeartHandshake className=' w-10 max-w-10 h-10 max-h-10 text-brand' />
              <h4 className='text-lg font-bold text-slate-900 my-2'>
                Unity
              </h4>
              <p className='text-unique font-normal text-sm'>
                {fourthDescription}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='py-24'>
            <div className='text-center m-auto'>
              <h2 className='text-4xl font-bold text-[#4A3F35] mb-4'>
                Voices of Hope
              </h2>
              <p className='text-[#4A3F35]/70'>
                Hear from the incredible people who make our mission possible.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16'>
              {[
                { name: "Russel Abraham", role: "Founder", img: "/russel.png" },
                {
                  name: "Parvez Youhonna",
                  role: "Secretary",
                  img: "/parvez.png",
                },
                {
                  name: "Dr. Subir Khiyang",
                  role: "Accounts",
                  img: "/subir.png",
                },
                {
                  name: "David Chen",
                  role: "Monthly Donor",
                  img: "/admin.jfif",
                },
              ].map((member, index) => (
                <TestimonialCard
                  key={index}
                  index={index}
                  image={member.img}
                  name={member.name}
                  role={member.role}
                  quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving."
                />
              ))}
            </div>
          </div>
        </div>
        <section className='bg-brand py-20'>
          <div className='container'>
            <div className='flex flex-col justify-center items-center'>
              <p className='m-auto inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-md text-sm font-medium mb-6 border border-white/30'>
                {aboutContent.engageBadge}
              </p>
              <h3 className='text-3xl sm:text-5xl font-black pb-5 text-white'>
                {aboutContent.engageTitle}
              </h3>
              <p className='max-w-2xl text-center text-white'>
                {aboutContent.engageDescription}
              </p>
              <input
                type='email'
                value={aboutContent.engageEmail || ""}
                readOnly
                className='bg-white px-3 py-5 text-center m-3 block w-70 sm:w-96 rounded-xl outline-none'
              />
              <button
                onClick={handleClick}
                className='px-6 py-3 text-xl font-bold text-brand rounded-2xl bg-white inline-block cursor-pointer'
              >
                {aboutContent.engageButtonText}
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default CoreValues;

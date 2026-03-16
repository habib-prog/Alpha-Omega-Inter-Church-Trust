import React from "react";
import { BsTransparency } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";
import TestimonialCard from "../Components/TestimonialCard";
import { Link } from "react-router";

const CoreValues = () => {
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
                We believe every person deserves dignity, care, and opportunity.
                Our mission begins with empathy and a deep commitment to helping
                those in need.
              </p>
            </div>
            <div className='p-6 flex flex-col bg-gray-50 justify-center items-center rounded-2xl shadow-xl'>
              <BsTransparency className=' w-10 max-w-10 h-10 max-h-10 text-brand' />
              <h4 className='text-lg font-bold text-slate-900 my-2'>
                Transparency
              </h4>
              <p className='text-unique font-normal text-sm'>
                We are fully transparent about how funds are used. Every
                donation is tracked, and every impact is shared with our
                community.
              </p>
            </div>
            <div className='p-6 flex flex-col bg-gray-50 justify-center items-center rounded-2xl shadow-xl'>
              <FaPeopleRoof className=' w-10 max-w-10 h-10 max-h-10 text-brand' />
              <h4 className='text-lg font-bold text-slate-900 my-2'>
                Compassion
              </h4>
              <p className='text-unique font-normal text-sm'>
                Real change happens together. We work closely with donors,
                volunteers, and local communities to create lasting
                impact.Building hope as one.
              </p>
            </div>
            <div className='p-6 flex flex-col bg-gray-50 justify-center items-center rounded-2xl shadow-xl'>
              <LuHeartHandshake className=' w-10 max-w-10 h-10 max-h-10 text-brand' />
              <h4 className='text-lg font-bold text-slate-900 my-2'>
                Compassion
              </h4>
              <p className='text-unique font-normal text-sm'>
                We focus on sustainable solutions that create real, measurable
                change — not just short-term relief.We turn donations into
                lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* Voices of Hope (Testimonials) */}
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
                /* CRITICAL CHANGE: 
                 We pass the 'index' prop so TestimonialCard knows 
                 whether to slide from the Left or Right -James(author changed the cod).
              */
                <TestimonialCard
                  key={index}
                  index={index}
                  image={member.img}
                  name={member.name}
                  role={member.role}
                  quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving."
                  impact='3 Families'
                />
              ))}
            </div>
          </div>
        </div>
        <section className='bg-brand px-64 py-20'>
          <div className='container'>
            <div className='flex flex-col justify-center items-center'>
              <p className=' m-auto inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-md text-sm font-medium mb-6 border border-white/30  '>
                Non-profit Organization
              </p>
              <h3 className='text-5xl font-black pb-5 text-white'>
                Become a Volunteer
              </h3>
              <p className='w-[624px] text-center text-white'>
                Your time is the most valuable gift you can give. Join our
                dedicated team and help us bring sustainable change to
                communities that need it most. Every hour you contribute creates
                a ripple effect of hope.
              </p>
              <Link
                className='mt-5 p-4 text-xl font-bold text-brand rounded-2xl bg-white'
                to='/'
              >
                Engage With Us
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default CoreValues;

// add volunteer section

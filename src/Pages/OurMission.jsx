import React from "react";
import { FaBullseye } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const OurMission = () => {
  return (
    <section className='my-12 sm:my-24'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-15 sm:gap-20'>
          <div className='group'>
            <div className='inline-block p-2  rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors duration-500 relative after:absolute after:h-1 after:w-18 after:bg-[#F59E0B] after:top-32 after:-right-7 after:rounded-2xl'>
              <FaBullseye className='text-3xl  ' />
            </div>
            <h2 className='font-inter font-bold text-3xl mt-6 mb-13'>
              Our Mission
            </h2>
            <p className='text-[15px] text-[#475569] mb-6 font-inter leading-6 sm:leading-8 w-full sm:max-w-109.5'>
              To empower organizations with intuitive, scalable, and robust
              digital solutions that drive growth and efficiency. We believe in
              stripping away complexity to reveal the true potential of
              technology, making it accessible and impactful for everyone.
            </p>
            <ul className='list-disc space-y-1 sm:space-y-3 text-[#334155] marker:text-amber-500 pl-4'>
              <li>Child-focused initiatives</li>
              <li>Promoting literacy and numeracy</li>
              <li>Psychosocial support for students</li>
            </ul>
          </div>
          <div className='group'>
            <div className='inline-block p-2  rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-200 transition-colors duration-500 relative after:absolute after:h-1 after:w-18 after:bg-slate-400 after:top-32 after:-right-7 after:rounded-2xl'>
              <IoEyeOutline className='text-3xl  ' />
            </div>
            <h2 className='font-inter font-bold text-3xl mt-6 mb-13'>
              Our Vision
            </h2>
            <p className='text-[15px] text-[#475569] mb-6 font-inter leading-6 sm:leading-8 w-full sm:max-w-[438px]'>
              We envision a world where technology seamlessly integrates into
              daily life, enhancing human potential rather than replacing it. We
              aim to be the global standard for ethical, user-focused software
              development that stands the test of time.
            </p>
            <div className='pt-6 p-6 bg-slate-50 rounded-xl border border-slate-100 w-full'>
              <p className='text-sm font-medium leading-6 text-[#475569] w-full  sm:max-w-105'>
                "We believe in creating a world where every child has the
                opportunity to grow, thrive, and reach their full potential, no
                matter their background."
              </p>
              <p className='text-sm text-slate-500 mt-2'>— CEO & Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;

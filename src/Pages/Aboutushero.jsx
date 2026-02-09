import React from "react";
import { Link } from "react-router";

const Aboutushero = () => {
  return (
    <section>
      <div className=" w-full h-full pb-130 pt-25 max-h-72 sm:pt-35 sm:pb-135 bg-cover bg-center bg-no-repeat  bg-[url('/aboutus_hero.jpg')] ">
        <div className='container'>
          <div className='max-w-210 m-auto'>
            <div className='flex flex-col '>
              <p className=' m-auto inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-md text-sm font-medium mb-3 sm:mb-6 border border-white/30  '>
                ESTABLISHED 2018
              </p>
              <h1 className=' text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center sm:mb-6'>
                Why We Do
                <span className='block text-[#F4A261]'>What We Do</span>
              </h1>
              <p className=' text-xl sm:text-2xl font-light text-white/90 mb-5  sm:mb-10 max-w-2xl mx-auto text-center font-raleway'>
                Our mission is to ensure that every child, regardless of their
                background, has access to the resources, love, and opportunities
                they need to reach their full potential.
              </p>
              <div>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                  <div className='text-white  hover:bg-br text-[14px] px-6 py-3.5 border-2 duration-300 bg-[#F4A261] hover:scale-102  rounded-full cursor-pointer'>
                    <Link to='/mission' className='flex'>
                      Our Mission & Our Vision{" "}
                    </Link>
                  </div>
                  <div className='text-white  hover:bg-br text-[14px] px-15 sm:px-6 py-3.5 border-2 duration-300 bg-[#F4A261] hover:scale-102  rounded-full cursor-pointer'>
                    <Link to='/mission' className='flex'>
                      Our Journey{" "}
                    </Link>
                  </div>
                  <div className='text-white  hover:bg-br text-[14px] px-15 sm:px-6 py-3.5 border-2 duration-300 bg-[#F4A261] hover:scale-102  rounded-full cursor-pointer'>
                    <Link to='/mission' className='flex'>
                      Meet the Team{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutushero;

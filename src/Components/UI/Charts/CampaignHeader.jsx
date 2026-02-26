import { Link } from "react-router"
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { div } from "framer-motion/client"
import Card from "../../Card.jsx";

const CampaignHeader = () => {
    return (
        <div>
            <section className='bg-amber-800 backdrop-blur-md py-36'>
                <div className="container">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        <div>
                            <h2 className='ml-16 sm:ml-0 sm:text-start inline-block py-1 px-3 rounded-full bg-white/60 text-black font-bold backdrop-blur-md text-sm mb-3 sm:mb-6  '>THE ALPHA OMEGA INITIATIVE</h2>
                            <h1 className="text-center sm:text-start text-5xl md:text-6xl lg:text-7xl w-full font-secondery font-bold mb-6">
                                Every Hand <br /> <span className="text-white">Extended <br /> </span> Channges <br className="block" />
                                <span className="text-white block">a Life.</span>
                            </h1>
                            <p className='text-center sm:text-start text-lg md:text-xl text-[#1B1B1B]/80 mb-8 max-w-lg'> Join us in building sustainable communities where clean water, education, and hope flow freely. Your support plants the seeds for a better tomorrow.Donate Now</p>
                            <div className='flex flex-col sm:flex-row gap-5'>
                                <Link to="/" className='inline-flex  bg-[#E87461] items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FEFAE0] text-white hover:bg-[#D66350] px-8 py-4 text-lg group gap-2.5'>Donate Now <FaArrowRight /> </Link>
                                <Link to="/" className='inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#E87461] border-2 border-white text-white hover:bg-[#D66350] hover:border-[#D66350] px-8 py-4 text-lg group gap-2'> <IoPlayCircleOutline className='text-2xl' /> Learn Our Story</Link>
                            </div>
                        </div>


                        <div className="relative lg:overflow-visible">
                            {/* Image Section */}
                            <div className="w-full rounded-2xl overflow-hidden shadow-2xl lg:relative lg:rotate-2 lg:hover:rotate-0 transition-transform duration-700 ease-out">
                                <img
                                    src="/donate.jpg"
                                    alt="Volunteers helping community"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#1B1B1B]/40 to-transparent" />
                            </div>

                            {/* Floating Card */}
                            <div className="mt-6 lg:absolute lg:-bottom-8 lg:-left-8 bg-[#FEFAE0] p-6 rounded-xl shadow-xl border border-[#2D6A4F]/10 w-full lg:max-w-xs">
                                <p className="font-serif text-xl text-[#D66350] italic mb-2">
                                    "This program gave my children a future I only dreamed of."
                                </p>
                                <p className="text-sm font-semibold text-[#1B1B1B]">
                                    — Abrahams, Community Leader
                                </p>
                            </div>
                        </div>
                    </div>
                </div>{/*container*/}
            </section>

            <section className="py-20">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                        <Card
                            title="Education for All"
                            description="Building schools..."
                            campaign="500+ Students"
                            image="/cardphoto.avif" />
                        <Card
                            title="Sustainable Farming"
                            description="Teaching modern...."   
                            campaign="200 Families"
                            image="/agriculture.avif" />
                        <Card
                            title="Clean Water Initiative"
                            description="Providing clean water..."
                            campaign="12 Wells Built"
                            image="/cleanwater.jpg" />
                         <Card
                            title="Healthcare for All" 
                            description="Providing medical care..."   
                            campaign="1000+ Patients"
                            image="/healtcare.jpg" />






                         <Card
                            title="Healthcare for All" 
                            description="Providing medical care..."   
                            campaign="1000+ Patients"
                            image="/healtcare.jpg" />
                         <Card
                            title="Clean Water Initiative"
                            description="Providing clean water..."
                            campaign="12 Wells Built"
                            image="/cleanwater.jpg" />
                        <Card
                            title="Sustainable Farming"
                            description="Teaching modern...."   
                            campaign="200 Families"
                            image="/agriculture.avif" />
                        <Card
                            title="Education for All"
                            description="Building schools..."
                            campaign="500+ Students"
                            image="/cardphoto.avif" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CampaignHeader
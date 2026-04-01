import React from 'react';
import { Link } from "react-router";
import { FiPhoneCall } from 'react-icons/fi';
import { IoLocationOutline, IoMailOpenOutline } from 'react-icons/io5';
import { LuClock10 } from 'react-icons/lu';
import { TfiTwitter } from "react-icons/tfi";
import { SlSocialLinkedin } from "react-icons/sl";
import { SiInstagram } from "react-icons/si";
import { BsFillSendFill } from 'react-icons/bs';

const ContactUs = () => {
    return (
        <section className='py-36'>
           <div className="container">
             <div className='text-center mb-12'>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Let's start a conversation</h1>
                <p className='text-lg text-slate-600 max-w-2xl mx-auto'>Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 border-2 border-amber-700 rounded-2xl'>
                <div className="bg-slate-900 text-slate-50 p-8 md:p-12 h-full flex flex-col justify-between rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none relative overflow-hidden">

                    {/* Background decorative  */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-500 rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
                        <p className="text-slate-400 mb-10 text-lg">
                            We'd love to hear from you. Our friendly team is always here to chat.
                        </p>

                        <div className="space-y-8">

                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                                    <IoMailOpenOutline className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-200 mb-1">Chat to us</h3>
                                    <p className="text-slate-400 text-sm mb-1">
                                        Our friendly team is here to help.
                                    </p>
                                    <a href="#" className='text-brand-400 hover:text-brand-300 font-medium transition-colors'>
                                        hello@example.com
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                                    <IoLocationOutline className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-200 mb-1">Office</h3>
                                    <p className="text-slate-400 text-sm mb-1">
                                        Come say hello at our office HQ.
                                    </p>
                                    <p className="text-slate-300 font-medium">
                                        100 Smith Street <br />
                                        Collingwood VIC 3066 AU
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                                    <FiPhoneCall className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-200 mb-1">Phone</h3>
                                    <p className="text-slate-400 text-sm mb-1">
                                        Mon-Fri from 8am to 5pm.
                                    </p>
                                    <a
                                        href="#"
                                        className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
                                    >
                                        +1 (555) 000-0000
                                    </a>
                                </div>
                            </div>

                            {/* office time section */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-slate-800 p-3 rounded-lg text-brand-400">
                                    <LuClock10 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-200 mb-1">Business Hours</h3>
                                    <p className="text-slate-300 font-medium">
                                        Monday - Friday: 9:00 AM - 6:00 PM <br />
                                        Weekend: Closed
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Social section */}
                    <div className="mt-12 pt-8 border-t border-slate-800 relative z-10">
                        <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            <a to="#" className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:text-brand-400 hover:bg-slate-700 transition-all">
                                <TfiTwitter className="w-5 h-5" />
                            </a>
                            <a to="#" className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:text-brand-400 hover:bg-slate-700 transition-all">
                                <SlSocialLinkedin className="w-5 h-5" />
                            </a>
                            <a to="#" className="bg-slate-800 p-2.5 rounded-full text-slate-400 hover:text-brand-400 hover:bg-slate-700 transition-all">
                                <SiInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>
                {/*form part */}
 <div className="bg-white p-8 md:p-12 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none h-full">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Send us a message
        </h2>
        <p className="text-slate-500">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <form className="space-y-6">
        
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700"
              placeholder="Enter your Full Name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700"
              placeholder="AlphaOmega@gmail.com"
            />
          </div>

        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Subject
          </label>
          <select className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700">
            <option className='bg-amber-600 text-slate-700'>Education</option>
            <option className='bg-amber-600 text-slate-700'>Sustainable Farming</option>
            <option className='bg-amber-600 text-slate-700'>Clean Water Initiative</option>
            <option className='bg-amber-600 text-slate-700'>Healthcare</option>
            <option className='bg-amber-600 text-slate-700'>parenting responsibilities</option>
            <option className='bg-amber-600 text-slate-700'>Food</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-amber-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-amber-700 resize-none"
            placeholder="How can we help you?"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#E87461] hover:bg-amber-800 hover:text-white text-slate-900 font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center space-x-2"
        >
          <BsFillSendFill className="w-5 h-5" />
          <span>Send Message</span>
        </button>
      </form>
    </div>
            </div> {/*grid-col-div */}
           </div>
        </section>
    )
}

export default ContactUs

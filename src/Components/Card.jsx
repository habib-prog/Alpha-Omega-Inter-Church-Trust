import React from 'react'
import { MdArrowOutward } from "react-icons/md";

const Card = ({ title, description, campaign , image }) => {
  return (
    <div className="group card bg-base-100 w-full rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-105 cursor-pointer">
      <figure className='rounded-2xl overflow-hidden'>
        <img className="block transition-transform duration-500 group-hover:scale-125 w-full"
          src={image}
          alt={title} />
      </figure>
      <div className='p-2'>
        <h2 className="flex justify-between font-raleway mb-2 text-xl font-bold text-[#4A3F35] group-hover:text-[#E87461]">{title} <MdArrowOutward className='hidden group-hover:block'/></h2>
        <p className="text-base font-raleway text-[#4A3F35]/70 mb-4 ">{description}</p>
        <p className='text-sm font-raleway font-medium text-[#8FA888]'>{campaign}</p>
      </div>
    </div>
  )
}

export default Card

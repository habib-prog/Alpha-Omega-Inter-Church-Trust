import React from "react";

const Volunteer = () => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-screen bg-gray-50 '>
        <div className='bg-brand w-md max-w-lg sticky top-1/3 left-3/6 -translate-y-1/3 -translate-x-3/6 rounded-sm p-5'>
          <h3 className='text-sm font-bold text-white text-center'>
            Volunteers are the only human beings on the face of the earth who
            reflect this nation’s compassion, unselfish caring, patience, and
            just plain loving one another.
          </h3>
          <h4></h4>
          <input
            type='email'
            placeholder='Enter Your Email'
            className='mt-5 bg-white w-full p-2'
          />
        </div>
      </div>
    </>
  );
};

export default Volunteer;

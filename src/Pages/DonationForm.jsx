import Link from 'daisyui/components/link'
import React, { useState } from 'react'
import { BiDonateHeart } from 'react-icons/bi'
import { FaDonate } from 'react-icons/fa'

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const amounts = [25, 50, 100, 150, 200];
  const [donationType, setDonationType] = useState("");

  return (
 
    <main className="min-h-screen bg-amber-800 py-36 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center selection:bg-amber-light selection:text-forest">
      <div className="w-full max-w-xl">
        {/* Header / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-[#E87461] rounded-full w-fit h-fit p-8 mb-4 shadow-gray-900 drop-shadow-2xl">
            <FaDonate className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-3">
            Inter Church Trust
          </h1>
          <p className="text-lg text-gray-200 max-w-md mx-auto">
            Join us in bringing hope and essential resources to communities in
            need around the world.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-amber-100 rounded-2xl shadow-lg p-6 sm:p-10 border border-cream-dark ">
          <div className="bg-sage-lighter rounded-xl p-4 items-center space-x-3">
            <div className='grid grid-cols-2 gap-4 mb-5'>
              <button onClick={() => setDonationType("Single Time")} className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Give Once</button>
              <button onClick={() => setDonationType("Monthly")} className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Monthly</button>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-10'>

              {amounts.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'
                >
                  ${value}
                </button>
              ))}
              <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>Custom</button>

            </div>




          </div>
        </div>

        {/* submit form */}
        <form action="#" className='defaultForm' >
          <div className="bg-amber-100 rounded-2xl shadow-2xl p-6 sm:p-10 border border-cream-dark my-3">
            <div className="bg-sage-lighter rounded-xl p-4 items-center space-x-3">
              <h2 className='text-2xl sm:text-3xl font-serif font-medium text-shadow-black mb-3'>Your Details</h2>

              <div className='flex justify-between text-center my-4'>
                <p className="mt-3 font-semibold"><span className="mr-2.5 text-lg">Donation Type:</span>
                  <span className="font-normal">{donationType}</span></p>
                <p className="mt-3 font-semibold"><span className="mr-2.5 text-lg">Amount:</span>
                 <span className="font-normal">{amount}</span>
                 </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='my-2'>
                  <label htmlFor="firstName" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>First Name</label>
                  <input type="text" id='firstName' placeholder='First Name' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
                </div>
                <div className='my-2'>
                  <label htmlFor="lastName" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Last Name</label>
                  <input type="text" id='lastName' placeholder='Last Name' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
                </div>

              </div>
              <div className='my-2'>
                <label htmlFor="email" className=' block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Email Address</label>
                <input type="email" id='email' placeholder='@gmail.com' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
              </div>


            </div>
            {/*payment mathod*/}
            <div className="bg-sage-lighter rounded-xl p-4 items-center border space-x-3">
              <h3 className='text-lg sm:text-xl font-serif font-semibold text-shadow-black mb-3 bt-black/10'>Payment Method</h3>
              <div className='my-2'>
                <label htmlFor="card" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Card Number</label>
                <input type="text" id='card' placeholder='💳 0000 0000 0000 0000' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='my-2'>
                  <label htmlFor="date" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Expiry Date</label>
                  <input type="date" id='date' placeholder='MM/YY' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
                </div>
                <div className='my-2'>
                  <label htmlFor="cvc" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>CVC</label>
                  <input type="password" id='cvc' placeholder='12345' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
                </div>
              </div>


            </div>
            <div className='flex justify-center m-auto mt-5'>
              <button type='submit' className='bg-[#E87461] border-[#E87461] text-black hover:bg-[#D66350] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>Complete Donation</button>
            </div>
          </div>
        </form>



      </div>
    </main>
  )
}

export default DonationForm

import Link from 'daisyui/components/link'
import React from 'react'
import { BiDonateHeart } from 'react-icons/bi'
import { FaDonate } from 'react-icons/fa'

const DonationForm = () => {
  return (
    // <section className='bg-[#F5E7C6] backdrop-blur-md py-36 w-full'>
    //     <div className="container max-w-3/4">
    //         <div className='flex flex-col items-center justify-center'>
    //             <div className=' bg-[#E87461] rounded-full w-fit h-fit p-8 items-center mb-15 shadow-gray-900 drop-shadow-2xl'>
    //                 <FaDonate className='text-9xl text-white' />
    //             </div>


    //             <div>
    //                 <h1 className='text-center text-3xl md:text-7xl font-medium font-secondery mb-4'>Make a Difference Today</h1>
    //                 <p className='text-center max-w-80 sm:max-w-lg m-auto'>Your generosity provides immediate relief and long-term support to communities in need. Every contribution brings hope.</p>


    //                 <div className='flex m-auto justify-center gap-5 mt-10'>
    //                     <button className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Give Once</button>
    //                     <button className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Monthly</button>
    //                 </div>
    //                 <div className='flex flex-col-1 space-x-1.5 sm:flex-col-3 justify-center items-center drop-shadow-2xl'>
    //                     <div className='flex flex-col gap-1.5 sm:flex-col-3 sm:gap-2.5 mt-15'>
    //                         <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-15 py-3 rounded-3xl'>$25</button>
    //                         <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-15 py-3 rounded-3xl'>$50</button>
    //                         <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-15 py-3 rounded-3xl'>$100</button>
    //                     </div>
    //                     <div className='flex flex-col gap-1.5 sm:flex-col-3 sm:gap-2.5 mt-15 '>
    //                         <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-15 py-3 rounded-3xl'>$250</button>
    //                         <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-15 py-3 rounded-3xl'>$300</button>
    //                         <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-15 py-3 rounded-3xl'>Custom</button>
    //                     </div>
    //                 </div>

    //             </div>
    //             <form action="">

    //             </form>




    //         </div>
    //     </div>{/*container*/}
    // </section>
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
              <button className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Give Once</button>
              <button className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Monthly</button>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-10'>

              <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>$25</button>
              <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>$50</button>


              <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>$100</button>
              <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>$150</button>


              <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>$200</button>
              <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>Custom</button>

            </div>




          </div>
        </div>

        <div className="bg-amber-100 rounded-2xl shadow-2xl p-6 sm:p-10 border border-cream-dark my-3">
          <div className="bg-sage-lighter rounded-xl p-4 items-center space-x-3">
            <h2 className='text-2xl sm:text-3xl font-serif font-medium text-shadow-black mb-3'>Your Details</h2>

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
              <label htmlFor="email" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Email Address</label>
              <input type="email" id='email' placeholder='@gmail.com' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
            </div>

          </div>
          {/*payment mathod8*/}
          <div className="bg-sage-lighter rounded-xl p-4 items-center border space-x-3">
            <h3 className='text-lg sm:text-xl font-serif font-semibold text-shadow-black mb-3 bt-black/10'>Payment Method</h3>
            <div className='my-2'>
              <label htmlFor="card" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Card Number</label>
              <input type="email" id='card' placeholder='💳 0000 0000 0000 0000' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
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
              <button className='bg-[#E87461] border-[#E87461] text-black hover:bg-[#D66350] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>Complete Donation</button>
            </div>
        </div>

      </div>
    </main>
  )
}

export default DonationForm

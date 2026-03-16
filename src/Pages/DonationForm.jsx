// import Link from 'daisyui/components/link'
// import React, { useState } from 'react'
// import { BiDonateHeart } from 'react-icons/bi'
// import { FaDonate } from 'react-icons/fa'

// const DonationForm = () => {
//   const [amount, setAmount] = useState("");
//   const amounts = [25, 50, 100, 150, 200];
//   const [donationType, setDonationType] = useState("");

//   return (

//     <main className="min-h-screen bg-amber-800 py-36 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center selection:bg-amber-light selection:text-forest">
//       <div className="w-full max-w-xl">
//         {/* Header / Branding */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center bg-[#E87461] rounded-full w-fit h-fit p-8 mb-4 shadow-gray-900 drop-shadow-2xl">
//             <FaDonate className="text-5xl text-white" />
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-3">
//             Inter Church Trust
//           </h1>
//           <p className="text-lg text-gray-200 max-w-md mx-auto">
//             Join us in bringing hope and essential resources to communities in
//             need around the world.
//           </p>
//         </div>

//         {/* Form Container */}
//         <div className="bg-amber-100 rounded-2xl shadow-lg p-6 sm:p-10 border border-cream-dark ">
//           <div className="bg-sage-lighter rounded-xl p-4 items-center space-x-3">
//             <div className='grid grid-cols-2 gap-4 mb-5'>
//               <button onClick={() => setDonationType("Single Time")} className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Give Once</button>
//               <button onClick={() => setDonationType("Monthly")} className='bg-[#E87461] shadow-2xl hover:shadow-sm cursor-pointer text-white font-bold px-3 py-2 hover:bg-[#D66350] translate-2.5 rounded-3xl'>Monthly</button>
//             </div>
//             <div className='grid grid-cols-2 gap-4 mt-10'>

//               {amounts.map((value) => (
//                 <button
//                   key={value}
//                   onClick={() => setAmount(value)}
//                   className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'
//                 >
//                   ${value}
//                 </button>
//               ))}
//               <button className='bg-white border border-[#E87461] text-black hover:bg-[#E87461] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>Custom</button>

//             </div>

//           </div>
//         </div>

//         {/* submit form */}
//         <form action="#" className='defaultForm' >
//           <div className="bg-amber-100 rounded-2xl shadow-2xl p-6 sm:p-10 border border-cream-dark my-3">
//             <div className="bg-sage-lighter rounded-xl p-4 items-center space-x-3">
//               <h2 className='text-2xl sm:text-3xl font-serif font-medium text-shadow-black mb-3'>Your Details</h2>

//               <div className='flex justify-between text-center my-4'>
//                 <p className="mt-3 font-semibold"><span className="mr-2.5 text-lg">Donation Type:</span>
//                   <span className="font-normal">{donationType}</span></p>
//                 <p className="mt-3 font-semibold"><span className="mr-2.5 text-lg">Amount:</span>
//                  <span className="font-normal">{amount}</span>
//                  </p>
//               </div>

//               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                 <div className='my-2'>
//                   <label htmlFor="firstName" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>First Name</label>
//                   <input type="text" id='firstName' placeholder='First Name' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
//                 </div>
//                 <div className='my-2'>
//                   <label htmlFor="lastName" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Last Name</label>
//                   <input type="text" id='lastName' placeholder='Last Name' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
//                 </div>

//               </div>
//               <div className='my-2'>
//                 <label htmlFor="email" className=' block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Email Address</label>
//                 <input type="email" id='email' placeholder='@gmail.com' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
//               </div>

//             </div>
//             {/*payment mathod*/}
//             <div className="bg-sage-lighter rounded-xl p-4 items-center border space-x-3">
//               <h3 className='text-lg sm:text-xl font-serif font-semibold text-shadow-black mb-3 bt-black/10'>Payment Method</h3>
//               <div className='my-2'>
//                 <label htmlFor="card" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Card Number</label>
//                 <input type="text" id='card' placeholder='💳 0000 0000 0000 0000' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
//               </div>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                 <div className='my-2'>
//                   <label htmlFor="date" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>Expiry Date</label>
//                   <input type="date" id='date' placeholder='MM/YY' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
//                 </div>
//                 <div className='my-2'>
//                   <label htmlFor="cvc" className='block text-sm font-medium text-charity-charcoal/80 mb-1.5'>CVC</label>
//                   <input type="password" id='cvc' placeholder='12345' className='w-full px-4 py-3 bg-charity-offwhite border border-charity-charcoal/10 rounded-xl focus:outline-none focus:border-charity-green focus:ring-1 focus:ring-charity-green transition-colors' />
//                 </div>
//               </div>

//             </div>
//             <div className='flex justify-center m-auto mt-5'>
//               <button type='submit' className='bg-[#E87461] border-[#E87461] text-black hover:bg-[#D66350] hover:border-0 hover:text-white font-bold text-xl px-8 py-2 sm:px-15 sm:py-3 rounded-3xl'>Complete Donation</button>
//             </div>
//           </div>
//         </form>

//       </div>
//     </main>
//   )
// }

// // export default DonationForm
// import React, { useState } from "react";
// import { FaDonate } from "react-icons/fa";

// const DonationForm = () => {
//   // Logic states
//   const [amount, setAmount] = useState(100);
//   const [donationType, setDonationType] = useState("Monthly");
//   const amounts = [25, 50, 100, 150, 200];

//   return (
//     // Background image
//     <main
//       className="min-h-screen bg-cover bg-center bg-no-repeat relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')`,
//       }}
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/60 z-0"></div>

//       <div className="w-full max-w-xl z-10 relative">
//         {/* Header section */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center bg-[#E87461] rounded-full p-6 mb-5 shadow-lg animate-pulse-slow">
//             <FaDonate className="text-5xl text-white" />
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3 text-shadow-md">
//             Inter Church Trust
//           </h1>
//           <p className="text-lg text-gray-200 max-w-md mx-auto font-light">
//             Bringing hope to communities in need around the world.
//           </p>
//         </div>

//         {/* Selection card */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 border border-brand mb-8">
//           <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6 border-b border-brand pb-3">
//             Select Donation
//           </h2>

//           <div className="space-y-8">
//             {/* Type buttons */}
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => setDonationType("Single Time")}
//                 className={`py-3 rounded-full font-bold transition-all ${donationType === "Single Time" ? "bg-[#D66350] text-white scale-105" : "bg-white border border-[#E87461] text-[#E87461]"}`}
//               >
//                 Give Once
//               </button>
//               <button
//                 onClick={() => setDonationType("Monthly")}
//                 className={`py-3 rounded-full font-bold transition-all ${donationType === "Monthly" ? "bg-[#D66350] text-white scale-105" : "bg-white border border-[#E87461] text-[#E87461]"}`}
//               >
//                 Monthly
//               </button>
//             </div>

//             {/* Amount grid */}
//             <div className="grid grid-cols-3 gap-3 sm:gap-4">
//               {amounts.map((value) => (
//                 <button
//                   key={value}
//                   onClick={() => setAmount(value)}
//                   className={`py-3 rounded-xl font-bold text-xl transition-all border-2 ${amount === value ? "bg-[#E87461] border-[#E87461] text-white shadow-lg scale-105" : "bg-white border-gray-300 text-gray-800"}`}
//                 >
//                   ${value}
//                 </button>
//               ))}
//               <button className="bg-white border-2 border-gray-300 text-gray-800 font-semibold rounded-xl">
//                 Custom
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Details form */}
//         <form action="#" className="defaultForm">
//           <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 border border-brand">
//             <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6 border-b border-brand pb-3">
//               Your Details
//             </h2>

//             {/* Selection summary */}
//             <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4 my-6 border border-gray-200">
//               <p className="text-gray-700">
//                 Type: <strong>{donationType}</strong>
//               </p>
//               <p className="text-gray-700">
//                 Amount:{" "}
//                 <strong className="text-[#E87461] text-xl">${amount}</strong>
//               </p>
//             </div>

//             {/* Info inputs */}
//             <div className="space-y-5">
//               <div className="grid grid-cols-2 gap-5">
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461]"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461]"
//                 />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461]"
//               />
//             </div>

//             {/* Payment fields */}
//             <div className="mt-10 pt-8 border-t border-gray-200 space-y-5">
//               <h3 className="text-xl font-serif font-semibold text-gray-900 mb-5">
//                 Payment Method
//               </h3>
//               <input
//                 type="text"
//                 placeholder="💳 Card Number"
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461]"
//               />
//               <div className="grid grid-cols-2 gap-5">
//                 <input
//                   type="text"
//                   placeholder="MM/YY"
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461]"
//                 />
//                 <input
//                   type="password"
//                   placeholder="CVC"
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461]"
//                 />
//               </div>
//             </div>

//             {/* Submit button */}
//             <div className="flex justify-center mt-10">
//               <button
//                 type="submit"
//                 className="w-full bg-[#E87461] hover:bg-[#D66350] text-white font-bold text-xl py-4 rounded-full shadow-lg transition-all active:scale-95"
//               >
//                 Donate ${amount} Now
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Global styles */}
//       <style jsx global>{`
//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.85;
//           }
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 3s infinite;
//         }
//         .text-shadow-md {
//           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//         }
//       `}</style>
//     </main>
//   );
// };

// export default DonationForm;
import React, { useState } from "react";
import { FaDonate } from "react-icons/fa";

const DonationForm = () => {
  // Logic states
  const [amount, setAmount] = useState(100);
  const [donationType, setDonationType] = useState("Monthly");
  const amounts = [25, 50, 100, 150, 200];

  return (
    <main className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* --- Background Wrapper --- */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* 1. Mobile Background Image (Default: Visible, Desktop: Hidden) */}
        <div
          className="block md:hidden w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')`,
          }}
        ></div>

        {/* 2. Desktop Background Video (Default: Hidden, Desktop: Visible) */}
        <video
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
          className="hidden md:block w-full h-full object-cover"
        >
          <source src="/vdo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 3. Dark Overlay (Common for both) */}
        <div className="absolute inset-0 bg-black/65 z-10 pointer-events-none"></div>
      </div>
      {/* --- End Background Wrapper --- */}

      <div className="w-full max-w-xl z-20 relative">
        {/* Header section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-[#E87461] rounded-full p-6 mb-5 shadow-lg animate-pulse-slow">
            <FaDonate className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3 text-shadow-md">
            Alpha Omega Trust
          </h1>
          <p className="text-lg text-gray-200 max-w-md mx-auto font-light">
            Bringing hope to communities in need around the world.
          </p>
        </div>

        {/* Selection card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#E87461]/30 mb-8">
          <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6 border-b border-[#E87461]/20 pb-3">
            Select Donation
          </h2>

          <div className="space-y-8">
            {/* Type buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setDonationType("Single Time")}
                className={`py-3 rounded-full font-bold transition-all ${
                  donationType === "Single Time"
                    ? "bg-[#D66350] text-white scale-105 shadow-md"
                    : "bg-white/50 border border-[#E87461] text-[#E87461] hover:bg-white"
                }`}
              >
                Give Once
              </button>
              <button
                onClick={() => setDonationType("Monthly")}
                className={`py-3 rounded-full font-bold transition-all ${
                  donationType === "Monthly"
                    ? "bg-[#D66350] text-white scale-105 shadow-md"
                    : "bg-white/50 border border-[#E87461] text-[#E87461] hover:bg-white"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Amount grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {amounts.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`py-3 rounded-xl font-bold text-xl transition-all border-2 ${
                    amount === value
                      ? "bg-[#E87461] border-[#E87461] text-white shadow-lg scale-105"
                      : "bg-white/80 border-gray-300 text-gray-800 hover:border-[#E87461]"
                  }`}
                >
                  ${value}
                </button>
              ))}
              <button className="bg-white/80 border-2 border-gray-300 text-gray-800 font-semibold rounded-xl hover:border-[#E87461] transition-all">
                Custom
              </button>
            </div>
          </div>
        </div>

        {/* Details form */}
        <form action="#" className="defaultForm">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#E87461]/30">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6 border-b border-[#E87461]/20 pb-3">
              Your Details
            </h2>

            {/* Selection summary */}
            <div className="flex justify-between items-center bg-gray-100/80 rounded-xl p-4 my-6 border border-gray-200">
              <p className="text-gray-700 font-medium">
                Type: <strong>{donationType}</strong>
              </p>
              <p className="text-gray-700 font-medium">
                Amount:{" "}
                <strong className="text-[#E87461] text-xl">${amount}</strong>
              </p>
            </div>

            {/* Info inputs */}
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461] transition-all"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461] transition-all"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461] transition-all"
              />
            </div>

            {/* Payment fields */}
            <div className="mt-10 pt-8 border-t border-gray-200 space-y-5">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-5">
                Payment Method
              </h3>
              <input
                type="text"
                placeholder="💳 Card Number"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461] transition-all"
              />
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461] transition-all"
                />
                <input
                  type="password"
                  placeholder="CVC"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#E87461] transition-all"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="w-full bg-[#E87461] hover:bg-[#D66350] text-white font-bold text-xl py-4 rounded-full shadow-lg transition-all active:scale-95"
              >
                Donate ${amount} Now
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        .text-shadow-md {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </main>
  );
};

export default DonationForm;

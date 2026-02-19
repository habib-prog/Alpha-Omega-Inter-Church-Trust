// import Card from "../Components/Card";
// import React from "react";
// import TestimonialCard from "../Components/TestimonialCard";

// const Ourimpacts = () => {
//   return (
//     <section className="py-10">
//       <div className="container">
//         <div className="text-center m-auto">
//           <h3 className="text-[#E87461] text-sm font-medium">Our Impact</h3>
//           <h2 className="text-4xl text-[#4A3F35] font-bold mb-4 mt-2">
//             Projects We're Proud Of
//           </h2>
//           <p className="text-[#4A3F35]/70 max-w-2xl mx-auto">
//             See how your donations are being put to work across the globe,
//             creating sustainable change where it's needed most.
//           </p>
//         </div>

//         {/* Responsive grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//           <Card
//             title="Education for All"
//             description="Building schools and supplying learning materials for underprivileged children."
//             campaign="500+ Students"
//             image="/cardphoto.avif"
//           />
//           <Card
//             title="Sustainable Farming"
//             description="Teaching modern agricultural techniques to ensure food security."
//             campaign="200 Families"
//             image="/agriculture.avif"
//           />
//           <Card
//             title="Clean Water Initiative"
//             description="Providing sustainable clean water access to remote villages in East Africa."
//             campaign="12 Wells Built"
//             image="/cleanwater.jpg"
//           />
//           <Card
//             title="Healthcare for All"
//             description="Providing urgent medical care and treatment to those who need it most."
//             campaign="1000+ Patients"
//             image="/healtcare.jpg"
//           />
//         </div>
//         {/*team member*/}
//         <div className="py-24">
//           <div className="text-center m-auto">
//             <h2 className="text-4xl font-bold text-[#4A3F35] mb-4">
//               Voices of Hope
//             </h2>
//             <p className="text-[#4A3F35]/70">
//               Hear from the incredible people who make our mission possible.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
//             <TestimonialCard
//               image="/russel.png"
//               name="Russel Abraham"
//               role="Founder"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//             <TestimonialCard
//               image="/parvez.png"
//               name="Parvez Youhonna"
//               role="Secretary"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//             <TestimonialCard
//               image="/subir.png"
//               name="Dr. Subir Khiyang"
//               role="Accounts"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//             <TestimonialCard
//               image="/admin.jfif"
//               name="David Chen"
//               role="Monthly Donor"
//               quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
//               impact="Impact: Supported 3 Families"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ourimpacts;
import Card from "../Components/Card";
import React from "react";
import TestimonialCard from "../Components/TestimonialCard";
import { motion as Motion } from "framer-motion";

const Ourimpacts = () => {
  // Parent container variants to handle sequential (staggered) loading of children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
      },
    },
  };

  // Default item variants for fade-in and scale-up effect
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-10"
    >
      <div className="container">
        {/* Header Section */}
        <Motion.div variants={itemVariants} className="text-center m-auto">
          <h3 className="text-[#E87461] text-sm font-medium">Our Impact</h3>
          <h2 className="text-4xl text-[#4A3F35] font-bold mb-4 mt-2">
            Projects We're Proud Of
          </h2>
          <p className="text-[#4A3F35]/70 max-w-2xl mx-auto">
            See how your donations are being put to work across the globe,
            creating sustainable change where it's needed most.
          </p>
        </Motion.div>

        {/* Project Cards Grid */}
        <Motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        >
          {[
            {
              title: "Education for All",
              desc: "Building schools...",
              camp: "500+ Students",
              img: "/cardphoto.avif",
            },
            {
              title: "Sustainable Farming",
              desc: "Teaching modern...",
              camp: "200 Families",
              img: "/agriculture.avif",
            },
            {
              title: "Clean Water Initiative",
              desc: "Providing clean water...",
              camp: "12 Wells Built",
              img: "/cleanwater.jpg",
            },
            {
              title: "Healthcare for All",
              desc: "Providing medical care...",
              camp: "1000+ Patients",
              img: "/healtcare.jpg",
            },
          ].map((item, index) => (
            <Motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }} // Lift effect on hover
              className="h-full"
            >
              <Card
                title={item.title}
                description={item.desc}
                campaign={item.camp}
                image={item.img}
              />
            </Motion.div>
          ))}
        </Motion.div>

        {/* Voices of Hope (Testimonials) */}
        <div className="py-24">
          <Motion.div variants={itemVariants} className="text-center m-auto">
            <h2 className="text-4xl font-bold text-[#4A3F35] mb-4">
              Voices of Hope
            </h2>
            <p className="text-[#4A3F35]/70">
              Hear from the incredible people who make our mission possible.
            </p>
          </Motion.div>

          <Motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
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
              { name: "David Chen", role: "Monthly Donor", img: "/admin.jfif" },
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
                impact="3 Families"
              />
            ))}
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  );
};

export default Ourimpacts;

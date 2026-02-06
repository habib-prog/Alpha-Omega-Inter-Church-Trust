import Card from "../Components/Card";
import React from "react";
import TestimonialCard from "../Components/TestimonialCard";

const Ourimpacts = () => {
  return (
    <section className="py-10">
      <div className="container-custom">
        <div className="text-center m-auto">
          <h3 className="text-[#E87461] text-sm font-medium">Our Impact</h3>
          <h2 className="text-4xl text-[#4A3F35] font-bold mb-4 mt-2">
            Projects We're Proud Of
          </h2>
          <p className="text-[#4A3F35]/70 max-w-2xl mx-auto">
            See how your donations are being put to work across the globe,
            creating sustainable change where it's needed most.
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <Card
            title="Education for All"
            description="Building schools and supplying learning materials for underprivileged children."
            campaign="500+ Students"
            image="/cardphoto.avif"
          />
          <Card
            title="Sustainable Farming"
            description="Teaching modern agricultural techniques to ensure food security."
            campaign="200 Families"
            image="/agriculture.avif"
          />
          <Card
            title="Clean Water Initiative"
            description="Providing sustainable clean water access to remote villages in East Africa."
            campaign="12 Wells Built"
            image="/cleanwater.jpg"
          />
          <Card
            title="Healthcare for All"
            description="Providing urgent medical care and treatment to those who need it most."
            campaign="1000+ Patients"
            image="/healtcare.jpg"
          />
        </div>
        {/*team member*/}
        <div className="py-24">
          <div className="text-center m-auto">
            <h2 className="text-4xl font-bold text-[#4A3F35] mb-4">
              Voices of Hope
            </h2>
            <p className="text-[#4A3F35]/70">
              Hear from the incredible people who make our mission possible.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <TestimonialCard
              image="/russel.png"
              name="Russel Abraham"
              role="Founder"
              quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
              impact="Impact: Supported 3 Families"
            />
            <TestimonialCard
              image="/parvez.png"
              name="Parvez Youhonna"
              role="Secretary"
              quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
              impact="Impact: Supported 3 Families"
            />
            <TestimonialCard
              image="/subir.png"
              name="Dr. Subir Khiyang"
              role="Accounts"
              quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
              impact="Impact: Supported 3 Families"
            />
            <TestimonialCard
              image="/admin.jfif"
              name="David Chen"
              role="Monthly Donor"
              quote="Seeing the direct impact of my donation on these families' lives has been incredibly moving. KindredHearts makes giving personal."
              impact="Impact: Supported 3 Families"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourimpacts;

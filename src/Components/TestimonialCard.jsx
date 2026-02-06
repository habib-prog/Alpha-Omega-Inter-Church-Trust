import React from "react";
import { RiDoubleQuotesR } from "react-icons/ri";

const TestimonialCard = ({
  image,
  name,
  role,
  quote,
  impact,
}) => {
  return (
    <div className="w-full max-w-md bg-[#FAF9F6] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
          />

          <div>
            <h4 className="text-base font-semibold text-gray-800">
              {name}
            </h4>
            <p className="text-xs uppercase tracking-widest text-orange-400">
              {role}
            </p>
          </div>
        </div>

    
         <RiDoubleQuotesR className="text-3xl text-orange-400 leading-none select-none" />
      </div>

      {/* Quote */}
      <p className="text-sm text-gray-600 leading-relaxed italic mb-6">
        “{quote}”
      </p>

      {/* Footer */}
      <p className="text-sm font-medium text-green-700">
        Impact: {impact}
      </p>
    </div>
  );
};

export default TestimonialCard;

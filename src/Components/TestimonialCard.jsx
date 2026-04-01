import React, { useMemo, useState } from "react";
import { RiDoubleQuotesR } from "react-icons/ri";

const TestimonialCard = ({
  image,
  name,
  role,
  quote,
  action = null,
  enableReadMore = false,
  previewChars = 170,
  fixedHeight = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const safeQuote = quote || "";
  const showToggle = enableReadMore && safeQuote.length > previewChars;
  const displayQuote = useMemo(() => {
    if (!showToggle || expanded) {
      return safeQuote;
    }
    return `${safeQuote.slice(0, previewChars).trim()}...`;
  }, [safeQuote, showToggle, expanded, previewChars]);

  return (
    <div
      className={`group w-full max-w-md bg-[#FAF9F6] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow ${
        fixedHeight ? "h-[320px] flex flex-col" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
          />

          <div>
            <h4 className="text-base font-semibold text-gray-800">{name}</h4>
            <p className="text-xs uppercase tracking-widest text-orange-400">
              {role}
            </p>
          </div>
        </div>

        <RiDoubleQuotesR className="text-3xl text-orange-400 leading-none select-none" />
      </div>

      {/* Quote */}
      <p
        className={`text-sm text-gray-600 leading-relaxed italic ${
          fixedHeight ? "flex-1 overflow-y-auto pr-1" : "mb-6"
        }`}
      >
        “{displayQuote}”
      </p>

      {showToggle ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-3 w-fit text-xs font-semibold text-[#E87461] hover:underline"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}

      {/* Footer Action */}
      {action ? (
        <div className="mt-4 flex items-center justify-end">{action}</div>
      ) : null}
    </div>
  );
};

export default TestimonialCard;

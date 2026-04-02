import React from "react";
import { MdArrowOutward } from "react-icons/md";

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const Card = ({
  title,
  description,
  campaign,
  image,
  goal = null,
  raised = null,
}) => {
  const hasFundingData =
    typeof goal === "number" &&
    typeof raised === "number" &&
    Number.isFinite(goal) &&
    Number.isFinite(raised) &&
    goal > 0;
  const progress = hasFundingData
    ? Math.min(Math.round((raised / goal) * 100), 100)
    : 0;

  return (
    <div className="group card bg-base-100 w-full rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-105 cursor-pointer">
      <figure className="rounded-2xl overflow-hidden">
        <img
          className="block transition-transform duration-500 group-hover:scale-125 w-full"
          src={image}
          alt={title}
        />
      </figure>
      <div className="p-2">
        <h2 className="flex justify-between font-raleway mb-2 text-xl font-bold text-[#4A3F35] group-hover:text-[#E87461]">
          {title} <MdArrowOutward className="hidden group-hover:block" />
        </h2>
        <p className="text-base font-raleway text-[#4A3F35]/70 mb-4 ">
          {description}
        </p>
        <p className="text-sm font-raleway font-medium text-[#8FA888]">
          {campaign}
        </p>

        {hasFundingData ? (
          <div className="mt-4 rounded-xl bg-[#FFF8ED] p-3">
            <div className="mb-2 grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#A67C52]">
              <span>Goal: {formatCurrency(goal)}</span>
              <span className="text-right">
                Raised: {formatCurrency(raised)}
              </span>
            </div>
            <div className="mb-1 h-2 overflow-hidden rounded-full bg-[#E7D7C8]">
              <div
                className="h-full  rounded-full bg-linear-to-r from-[#E87461] to-[#8FA888]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className=" text-xs font-semibold text-[#4A3F35] text-center">
              {progress}% funded
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;

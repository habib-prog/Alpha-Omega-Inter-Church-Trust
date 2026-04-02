import React, { useState } from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { useSiteContent } from "../data/useSiteContent";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const PastCampaigns = () => {
  const [showAllCampaigns, setShowAllCampaigns] = useState(false);
  const pastCampaignContent = useSiteContent(
    "past-campaigns",
    "/content/past-campaigns.json",
    { items: [] }
  );
  const pastCampaigns = pastCampaignContent.items || [];
  const hasMoreCampaigns = pastCampaigns.length > 2;
  const visiblePastCampaigns = showAllCampaigns
    ? pastCampaigns
    : pastCampaigns.slice(0, 2);

  return (
    <div className="bg-[#FFF8ED]">
      <section className="bg-[#7C5134] py-28 text-white">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-semibold tracking-[0.2em] uppercase">
              Past Campaigns
            </span>
            <h1 className="mt-5 text-4xl font-secondery font-bold sm:text-5xl lg:text-6xl">
              Stories of care that became measurable change.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
              Explore completed and near-complete campaigns with the amount
              raised, funding progress, and a short comment from the people each
              effort supported.
            </p>
            <Link
              to="/donation"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E87461] px-6 py-3 font-medium text-white transition-colors hover:bg-[#D66350]"
            >
              Support the next campaign <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A67C52]">
                Campaign archive
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#4A3F35]">
                Past campaigns and raised amounts
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#4A3F35]/75">
              Each campaign includes its fundraising target, amount raised,
              progress bar, and a short community comment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {visiblePastCampaigns.map((campaign) => {
              const progress = Math.min(
                Math.round((campaign.raised / campaign.goal) * 100),
                100
              );

              return (
                <article
                  key={campaign.title}
                  className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(74,63,53,0.12)]"
                >
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="space-y-5 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8FA888]">
                          {campaign.category || campaign.campaignName || "Past Campaign"}
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-[#4A3F35]">
                          {campaign.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-[#FEF1E8] px-4 py-2 text-sm font-semibold text-[#D66350]">
                        {progress}% funded
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-[#FFF8ED] p-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A67C52]">
                          Goal amount
                        </p>
                        <p className="mt-2 text-2xl font-bold text-[#4A3F35]">
                          {formatCurrency(campaign.goal)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A67C52]">
                          Raised amount
                        </p>
                        <p className="mt-2 text-2xl font-bold text-[#E87461]">
                          {formatCurrency(campaign.raised)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#4A3F35]">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-[#E7D7C8]">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-[#E87461] to-[#8FA888]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#E7D7C8] bg-[#FFFCF7] p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A67C52]">
                        Comment
                      </p>
                      <p className="mt-3 text-base leading-7 text-[#4A3F35]/80">
                        {campaign.comment || campaign.summary}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {hasMoreCampaigns ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCampaigns((prev) => !prev)}
                className="rounded-full border border-[#E87461] px-5 py-2.5 text-sm font-semibold text-[#E87461] transition hover:bg-[#E87461] hover:text-white"
              >
                {showAllCampaigns ? "View Less" : "Show More"}
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default PastCampaigns;

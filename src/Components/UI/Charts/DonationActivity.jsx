import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { id: 1, month: "Jan", amount: 1200 },
  { id: 2, month: "Feb", amount: 900 },
  { id: 3, month: "Mar", amount: 1500 },
  { id: 4, month: "Apr", amount: 1100 },
  { id: 5, month: "May", amount: 1800 },
  { id: 6, month: "Jun", amount: 1300 },
  { id: 7, month: "Jul", amount: 1700 },
];

const DonationActivity = () => {
  const brandColor = "#E87461";

  return (
    /* sm:border-4 mane choto screen e border thakbe na, padding o ektu komiyechi mobile er jonno */
    <div className="w-full h-80 bg-white p-2 sm:p-6 rounded-2xl border-none sm:border-[#E87461] sm:border-4 mt-6">
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="font-bold text-lg sm:text-xl text-[#E87461]">
          Donation Activity
        </h3>
        <span className="bg-[#E874611A] text-[#E87461] px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
          2026 Overview
        </span>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          /* Margin adjust kora hoyeche jate overlap na hoy */
          margin={{ top: 10, right: 5, left: -30, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F3F4F6"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            /* interval={0} mane sob gulo month dekhabe */
            interval={0}
            tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 500 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
          />

          <Tooltip
            cursor={{ fill: "#E874610D", radius: 6 }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E8746133",
              boxShadow: "0px 10px 15px -3px rgba(232, 116, 97, 0.1)",
              fontSize: "12px",
            }}
            itemStyle={{ color: "#E87461", fontWeight: "bold" }}
          />

          <Bar
            dataKey="amount"
            radius={[4, 4, 0, 0]}
            /* mobile e bar size ektu choto kora hoyeche jate gajagaji na lage */
            barSize={window.innerWidth < 640 ? 20 : 32}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={brandColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationActivity;

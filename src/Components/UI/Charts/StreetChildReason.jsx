import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Data: Percentage of reasons why they are on the street
const chartData = [
  { name: "Violence", value: 18, fill: "#fed7aa" }, // Light Orange
  { name: "Family Split", value: 25, fill: "#fb923c" }, // Medium Orange
  { name: "Extreme Poverty", value: 57, fill: "#ea580c" }, // Deep Orange (Main Reason)
];

const NEEDLE_BASE_RADIUS_PX = 5;
const NEEDLE_COLOR = "#4b5563";

// Needle Component
const StreetChildReason = ({ cx, cy, midAngle, innerRadius, outerRadius }) => {
  const needleLength = innerRadius + (outerRadius - innerRadius) / 2;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={NEEDLE_BASE_RADIUS_PX}
        fill={NEEDLE_COLOR}
        stroke="none"
      />
      <path
        d={`M${cx},${cy}l${needleLength},0`}
        strokeWidth={3}
        stroke={NEEDLE_COLOR}
        fill={NEEDLE_COLOR}
        style={{
          transform: `rotate(-${midAngle}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
        }}
      />
    </g>
  );
};

export default function StreetChildReasonNeedle() {
  return (
    <div className="info-graph-card01 p-4 rounded-xl">
      <div className="wraper w-full max-w-87.5 mx-auto flex flex-col gap-4 bg-base-100 p-4 rounded-lg shadow-md border border-orange-50">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 border-b border-orange-50 pb-2">
          <img src="/reason.png" className="w-5" alt="icon" />
          <p className="font-bold text-gray-700">Main Reason for Street Life</p>
        </div>

        {/* Chart Section - h-64 height */}
        <div className="h-64 w-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={chartData}
                cx="50%"
                cy="80%"
                innerRadius={60}
                outerRadius={100}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={chartData}
                cx="50%"
                cy="80%"
                innerRadius={60}
                outerRadius={100}
                stroke="none"
                activeShape={StreetChildReason}
                activeIndex={2} // Needle points to Extreme Poverty (index 2)
                isAnimationActive={true}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend Text inside the chart area */}
          <div className="text-center -mt-10">
            <p className="text-lg font-black text-orange-600 uppercase">
              Extreme Poverty
            </p>
            <p className="text-[11px] text-gray-500 font-bold">
              57% Children's Main Struggle
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-orange-50 pt-2">
          <p className="text-[10px] text-gray-400 font-semibold italic">
            Needle points to the most dominating factor.
          </p>
        </div>
      </div>
    </div>
  );
}

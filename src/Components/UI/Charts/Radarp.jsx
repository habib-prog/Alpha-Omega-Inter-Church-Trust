import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Data representing poverty rates by division
const data = [
  { subject: "Dhaka", A: 17.9, fullMark: 50 },
  { subject: "Chittagong", A: 15.8, fullMark: 50 },
  { subject: "Rajshahi", A: 16.7, fullMark: 50 },
  { subject: "Rangpur", A: 24.8, fullMark: 50 },
  { subject: "Barisal", A: 26.9, fullMark: 50 },
  { subject: "Sylhet", A: 17.4, fullMark: 50 },
];

export default function Radarp() {
  return (
    <div className="info-graph-card01 p-2 md:p-4">
      {/* Container with responsive width: max-w-[350px] prevents overlapping on iPads */}
      <div className="wraper w-full max-w-87.5 mx-auto flex flex-col gap-4 bg-base-100 p-4 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex justify-center items-center gap-2">
          <img src="/bd.png" className="w-6" alt="poverty" />
          <p className="font-bold text-gray-700 text-sm md:text-base">
            Division-wise Poverty
          </p>
        </div>

        {/* Radar Chart Section - Height kept at h-64 */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#6b7280", fontSize: 10, fontWeight: "bold" }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 40]}
                tick={false}
                axisLine={false}
              />

              <Radar
                name="Poverty Rate"
                dataKey="A"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.5}
                // Optional: Show values directly on radar points
                label={{ fill: "#4b5563", fontSize: 9, fontWeight: "bold" }}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer/Legend Section */}
        <div className="text-center border-t pt-2">
          <p className="text-[10px] text-gray-400 font-semibold italic">
            Data Source: HIES Bangladesh 2022
          </p>
        </div>
      </div>
    </div>
  );
}

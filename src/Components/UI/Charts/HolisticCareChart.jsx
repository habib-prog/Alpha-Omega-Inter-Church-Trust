import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data: Annual displacement rate due to riverbank erosion (Approximate stats)
const erosionData = [
  { year: "2019", homeless: 45000 },
  { year: "2020", homeless: 52000 },
  { year: "2021", homeless: 48000 },
  { year: "2022", homeless: 65000 },
  { year: "2023", homeless: 58000 },
  { year: "2024", homeless: 72000 },
];

export default function RiverErosionChart() {
  return (
    <div className="info-graph-card01 p-4 rounded-xl">
      <div className="wraper w-full mx-auto max-w-87.5 flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md border border-orange-100">
        {/* Header Section */}
        <div className="flex justify-center items-center gap-2  pb-2">
          <div className="p-1 rounded-full">
            <img src="/river.png" className="w-5" alt="river icon" />
          </div>
          <p className="font-bold text-gray-700 text-sm">
            River Erosion Displacement
          </p>
        </div>

        {/* Chart Section - Height h-64 */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={erosionData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHomeless" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#fff7ed"
              />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="stepAfter" // Highlighting the sudden "jumps" in displacement
                dataKey="homeless"
                stroke="#ea580c"
                fillOpacity={1}
                fill="url(#colorHomeless)"
                strokeWidth={2}
                label={{
                  position: "top",
                  fill: "#ea580c",
                  fontSize: 9,
                  fontWeight: "bold",
                  formatter: (val) => `${val / 1000}k`,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer info */}
        <div className="text-center border-t border-orange-50 pt-2">
          <p className="text-[10px] text-gray-400 font-semibold italic">
            Annual average of people losing homes to rivers.
          </p>
        </div>
      </div>
    </div>
  );
}

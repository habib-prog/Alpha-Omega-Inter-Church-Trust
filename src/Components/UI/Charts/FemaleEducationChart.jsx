import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data: Female Literacy Rate in Bangladesh (Approximate Trend)
const femaleEducationData = [
  { year: "2000", rate: 42.5 },
  { year: "2005", rate: 49.8 },
  { year: "2010", rate: 55.2 },
  { year: "2015", rate: 61.4 },
  { year: "2020", rate: 71.9 },
  { year: "2024", rate: 75.6 },
];

export default function FemaleEducation() {
  return (
    <div className="info-graph-card01 p-2 md:p-4">
      {/* Container with max-width to maintain clean look on iPad and Mobile */}
      <div className="wraper w-full max-w-[350px] mx-auto flex flex-col gap-4 bg-base-100 p-4 rounded-lg shadow-md border border-orange-50">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-2">
          <img src="/female.png" className="w-5" alt="education icon" />
          <p className="font-bold text-gray-700 text-sm md:text-base">
            Female Literacy Rate
          </p>
        </div>

        {/* Chart Section - Height kept at h-64 for consistency */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={femaleEducationData}
              margin={{ top: 15, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                {/* Orange Theme Gradient to match your website */}
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
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
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#fb923c"
                fillOpacity={1}
                fill="url(#colorOrange)"
                strokeWidth={3}
                label={{
                  position: "top",
                  fill: "#ea580c",
                  fontSize: 10,
                  fontWeight: "bold",
                  formatter: (val) => `${val}%`,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Extra Info / Footer */}
        <div className="text-center border-t pt-2">
          <p className="text-[10px] text-gray-400 font-semibold italic">
            Data Source: BBS & UNESCO | Trend: Rising
          </p>
        </div>
      </div>
    </div>
  );
}

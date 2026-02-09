import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { category: "No School", percentage: 82 },
  { category: "Malnutrition", percentage: 65 },
  { category: "No Shelter", percentage: 74 },
  { category: "Working", percentage: 45 },
];

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"];

export default function ChildStatistics() {
  return (
    <div className="info-graph-card01 p-4 rounded-xl">
      <div className="wraper mx-auto w-full max-w-87.5 flex flex-col gap-4 bg-base-100 p-4 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-2 border-b border-orange-50 pb-2">
          <img src="/sleep.png" className="w-5" alt="child icon" />
          <p className="font-bold text-gray-700">Street Children Crisis</p>
        </div>

        {/* Chart Section - Height kept at h-64 */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: -25, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 10, fill: "#6b7280", fontWeight: "bold" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip cursor={{ fill: "#fff7ed" }} />
              <Bar
                dataKey="percentage"
                radius={[4, 4, 0, 0]}
                barSize={30}
                label={{
                  position: "top",
                  formatter: (val) => `${val}%`,
                  fontSize: 10,
                  fontWeight: "bold",
                  fill: "#ea580c",
                }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer info */}
        <div className="text-center border-t pt-2">
          <p className="text-[10px] text-gray-400 font-semibold italic">
            Urgent support is needed for their survival.
          </p>
        </div>
      </div>
    </div>
  );
}

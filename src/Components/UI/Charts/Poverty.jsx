import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Rural Poverty", value: 20.5 }, // Gramer daridro
  { name: "Urban Poverty", value: 14.7 }, // Shohorer daridro
];

// Alada alada color set kora
const COLORS = ["#ef4444", "#fb923c"]; // Rural er jonno Lal, Urban er jonno Orange

export default function Poverty() {
  return (
    <div className="info-graph-card01 p-2 md:p-4">
      <div className="wraper w-full max-w-[350px] mx-auto flex flex-col gap-4 bg-base-100 p-4 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-2">
          <img src="/poverty.png" className="w-5" alt="poverty icon" />
          <p className="font-bold text-gray-700 text-sm md:text-base">
            Poverty: Rural vs Urban
          </p>
        </div>

        {/* Chart Section */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%" // Responsive donut style
                outerRadius="80%"
                paddingAngle={5}
                dataKey="value"
              >
                {/* Prottekta part er jonno alada color */}
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              {/* Legend: Eta niche likhe dibe konta color kisher */}
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-xs font-medium text-gray-600">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Extra Info */}
        <div className="text-center border-t pt-2">
          <p className="text-[10px] text-gray-400 font-semibold italic">
            Data Source: HIES Bangladesh 2022
          </p>
        </div>
      </div>
    </div>
  );
}

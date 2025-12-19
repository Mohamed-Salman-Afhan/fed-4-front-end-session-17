import { Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Value", value: 332 },
  { name: "Remaining", value: 168 }, // Assuming 500 max
];
const COLORS = ["#ffffff", "rgba(255,255,255,0.2)"];

export default function PowerCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 h-full shadow-lg flex flex-col justify-between">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Zap className="w-5 h-5" /> Real-Time Power
      </h3>

      <div className="flex flex-row items-center justify-between">
        <div className="relative w-48 h-48">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={180}
                        endAngle={0}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center -mt-8">
                <span className="text-3xl font-bold">332kw</span>
                <span className="text-xs opacity-80">66%</span>
            </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
             <div className="text-sm">
                <span className="block opacity-70 text-xs">Avg Wind Speed (10 min)</span>
                <span className="font-semibold">7.8 m/s</span>
             </div>
             <div className="text-sm">
                <span className="block opacity-70 text-xs">Avg Power (10 min)</span>
                <span className="font-semibold">280.4 kW</span>
             </div>
             <div className="text-sm">
                <span className="block opacity-70 text-xs">Peak Power (10 min)</span>
                <span className="font-semibold">332.1 kW</span>
             </div>
             <div className="text-sm">
                <span className="block opacity-70 text-xs">Total Energy</span>
                <span className="font-semibold">4.0 GWh</span>
             </div>
        </div>
      </div>
    </div>
  );
}

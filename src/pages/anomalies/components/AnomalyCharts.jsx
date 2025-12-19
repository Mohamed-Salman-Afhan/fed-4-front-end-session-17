import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const AnomalyCharts = ({ anomalies = [] }) => {
  // Aggregate data for Pie Chart
  const typeCounts = anomalies.reduce((acc, curr) => {
    // Determine type/category from issue string or description if 'issue' is verbose
    // For simplicity, we'll map common keywords or use 'issue' directly if it's short,
    // but in seed data "issue" is short enough e.g. "Inverter Offline"
    const type = curr.issue.split(' ')[0] || "Unknown"; // Take first word as proxy for type
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(typeCounts).map((key, index) => ({
    name: key,
    value: typeCounts[key],
    color: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"][index % 4]
  }));

  // Mock trends for now since we don't have historical data in the seed
  const lineData = [
    { day: "Mon", count: 8 },
    { day: "Tue", count: 12 },
    { day: "Wed", count: 6 },
    { day: "Thu", count: 15 },
    { day: "Fri", count: 9 },
    { day: "Sat", count: 4 },
    { day: "Sun", count: 3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">Anomaly Types Distribution</h3>
        </div>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">Anomaly Trends</h3>
        </div>
        <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <RechartsTooltip />
                    <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={{fill: '#3b82f6', strokeWidth: 2}} 
                        activeDot={{r: 6}} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnomalyCharts;

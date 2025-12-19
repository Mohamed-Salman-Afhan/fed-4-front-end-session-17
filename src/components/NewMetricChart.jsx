import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function NewMetricChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/metrics/capacity-factor`);
        if (response.ok) {
           const jsonData = await response.json();
           setData(jsonData);
        }
      } catch (error) {
        console.error("Failed to fetch metrics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div className="h-64 bg-secondary/20 animate-pulse rounded-xl" />;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-4">Capacity Factor (Last 7 Days)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
                dataKey="name" 
                stroke="var(--muted-foreground)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
            />
            <YAxis 
                stroke="var(--muted-foreground)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value * 100}%`} 
            />
            <Tooltip 
                cursor={{ fill: 'var(--secondary)' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }}
            />
            <Bar 
                dataKey="factor" 
                name="Capacity Factor" 
                fill="var(--chart-1)" 
                radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Efficiency relative to maximum theoretical output.
      </p>
    </div>
  );
}

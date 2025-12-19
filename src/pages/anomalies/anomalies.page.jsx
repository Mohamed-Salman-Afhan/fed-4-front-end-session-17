import AnomalyStats from "./components/AnomalyStats";
import AnomalyCharts from "./components/AnomalyCharts";
import AnomalyList from "./components/AnomalyList";

import { useGetAnomaliesQuery } from "@/lib/redux/query";

const AnomaliesPage = () => {
  const { data: anomalies, isLoading, isError } = useGetAnomaliesQuery();

  if (isLoading) return <div className="p-8">Loading anomalies...</div>;
  if (isError) return <div className="p-8 text-red-500">Error loading anomalies.</div>;

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Anomaly Detection</h1>
        <p className="text-muted-foreground text-sm">Monitor and investigate unusual patterns in wind turbine operations.</p>
      </div>

      <AnomalyStats anomalies={anomalies} />

      <AnomalyCharts anomalies={anomalies} />

      <AnomalyList anomalies={anomalies} />
    </main>
  );
};

export default AnomaliesPage;

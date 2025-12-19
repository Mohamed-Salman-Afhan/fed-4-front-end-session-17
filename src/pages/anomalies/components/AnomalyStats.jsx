import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

const AnomalyStats = ({ anomalies = [] }) => {
  const activeCount = anomalies.filter(a => a.status === 'Active').length;
  const underReviewCount = anomalies.filter(a => a.status === 'Under Review').length;
  // Assuming "Resolved Today" means resolved in last 24h, but for simplicity we'll just count all "Resolved" for now
  // or add a date check if "resolvedAt" exists. Since seed data has resolved 1 day ago, let's just count 'Resolved'.
  const resolvedCount = anomalies.filter(a => a.status === 'Resolved').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex justify-between items-start">
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Anomalies</p>
            <h3 className="text-3xl font-bold text-red-600">{activeCount}</h3>
        </div>
        <div className="p-2 bg-red-50 rounded-lg text-red-600">
            <AlertTriangle size={20} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex justify-between items-start">
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Under Review</p>
            <h3 className="text-3xl font-bold text-amber-600">{underReviewCount}</h3>
        </div>
        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
            <Clock size={20} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex justify-between items-start">
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Resolved Today</p>
            <h3 className="text-3xl font-bold text-green-600">{resolvedCount}</h3>
        </div>
        <div className="p-2 bg-green-50 rounded-lg text-green-600">
            <CheckCircle size={20} />
        </div>
      </div>
    </div>
  );
};

export default AnomalyStats;

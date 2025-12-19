import { Button } from "@/components/ui/button";

const AnomalyList = ({ anomalies = [] }) => {

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-red-100 text-red-700";
      case "under review": return "bg-amber-100 text-amber-700";
      case "resolved": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Anomalies</h3>
      </div>
      <div className="divide-y divide-border">
        {anomalies.map((anomaly) => (
          <div key={anomaly._id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-foreground text-lg">{anomaly.issue}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColor(anomaly.severity)}`}>
                    {anomaly.severity}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(anomaly.status)}`}>
                    {anomaly.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>@ {anomaly.solarUnitId?.serialNumber || "Unknown Unit"}</span>
                    <span>•</span>
                    <span>{new Date(anomaly.detectedAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{anomaly.description}</p>
              </div>
              
              <div className="flex items-center">
                 <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Investigate
                 </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnomalyList;

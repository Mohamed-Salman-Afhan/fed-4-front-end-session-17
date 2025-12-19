import { format, subDays } from "date-fns";

export default function EnergyRow() {
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
        date: format(date, "d MMMM"),
        value: Math.floor(Math.random() * (700 - 500) + 500) + "kW"
    };
  });

  return (
    <div className="w-full">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Last 7 Days Energy Consumption</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {days.map((day, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-border">
                    <div className="text-xs text-muted-foreground mb-1">{day.date}</div>
                    <div className="font-bold text-lg text-foreground">{day.value}</div>
                </div>
            ))}
        </div>
    </div>
  );
}

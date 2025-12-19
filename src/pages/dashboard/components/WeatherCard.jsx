import { Cloud, Wind, Thermometer } from "lucide-react";

export default function WeatherCard({ weather }) {
  const current = weather?.current_weather;
  const temp = current?.temperature ?? "--";
  const wind = current?.windspeed ?? "--";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 h-full shadow-lg">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Cloud className="w-32 h-32" />
      </div>
      
      <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
        <Cloud className="w-5 h-5" /> Weather Conditions
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold">{temp}°C</div>
            <div className="text-xs text-slate-300">Temperature</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold">{wind} m/s</div>
            <div className="text-xs text-slate-300">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

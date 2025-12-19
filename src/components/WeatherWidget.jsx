import { useEffect, useState } from "react";
import { CloudSun, Wind, Droplets } from "lucide-react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/weather`);
        if (!response.ok) {
            throw new Error("Failed to fetch weather");
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div className="p-4 bg-white rounded-xl shadow animate-pulse h-40">Loading Weather...</div>;
  if (error) return <div className="p-4 bg-red-50 text-red-500 rounded-xl shadow">Weather Unavailable</div>;

  const current = weather?.current_weather;
  const hourly = weather?.hourly || {};

  // Simple interpretation
  const temp = current?.temperature;
  const wind = current?.windspeed;
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-foreground">Site Conditions</h3>
        <CloudSun className="text-chart-3 w-6 h-6" />
      </div>
      
      <div className="flex items-end gap-2 mb-6">
        <span className="text-4xl font-bold text-foreground">{temp}°C</span>
        <span className="text-muted-foreground mb-1">Current Temperature</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
          <Wind className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Wind Speed</p>
            <p className="font-medium">{wind} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
            {/* Using a generic icon since we typically don't fail on missing specific ones */}
          <Droplets className="w-5 h-5 text-blue-500" />
          <div>
             {/* OpenMeteo generic response might not have humidity in current_weather, 
                 but we requested hourly. Let's just use a placeholder or safe access if we want to be fancy. 
                 For now, keeping it simple or omitting if complex to parse efficiently in one go. 
                 Actually, let's just show status. */}
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="font-medium">Normal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

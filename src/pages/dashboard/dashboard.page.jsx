import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import WeatherCard from "./components/WeatherCard";
import PowerCard from "./components/PowerCard";
import EnergyRow from "./components/EnergyRow";
import PowerChart from "./components/PowerChart";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { user } = useUser();
  const { data: fetchedSolarUnit, isLoading, isError, error } = useGetSolarUnitForUserQuery();
  const [solarUnit, setSolarUnit] = useState(null);

  // Cache data to prevent UI flash on transient errors
  useEffect(() => {
    if (fetchedSolarUnit) {
      setSolarUnit(fetchedSolarUnit);
    }
  }, [fetchedSolarUnit]);
  
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/weather`);
            if(res.ok) setWeather(await res.json());
        } catch(e) { console.error(e); }
    };
    fetchWeather();
  }, []);

  if (isLoading && !solarUnit) return <div className="p-8">Loading dashboard...</div>;
  
  // Only show error if we have NO data at all
  if (!solarUnit && isError) {
      return (
        <div className="p-8 text-red-500">
            <h2 className="text-xl font-bold mb-2">Error Loading Dashboard</h2>
            <p>{error?.data?.message || "Could not load solar unit."}</p>
            <p className="text-sm mt-4 text-gray-500">Retrying connection...</p>
        </div>
      );
  }

  return (
    <main className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-foreground">{user?.firstName}'s Home</h1>
            <p className="text-muted-foreground text-sm">Welcome back to your Solar Energy Dashboard</p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Status: {solarUnit?.status || "Normal"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-64">
        <WeatherCard weather={weather} />
        <PowerCard />
      </div>

      <EnergyRow />
      
      <PowerChart />
    </main>
  );
};

export default DashboardPage;

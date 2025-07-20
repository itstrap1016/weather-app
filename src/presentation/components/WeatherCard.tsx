import type { Weather } from "@/domain/Weather";

interface WeatherCardProps {
  weather: Weather;
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 w-64 text-center shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">{weather.city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="mx-auto w-20 h-20"
      />
      <p className="text-3xl font-semibold mt-2">{weather.temperature}°C</p>
      <p className="text-gray-600 mt-1">{weather.description}</p>
    </div>
  );
}

export default WeatherCard;

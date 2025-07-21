import type { Weather } from "@/domain/weather";

interface WeatherCardProps {
  weather: Weather;
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="py-15 flex flex-col items-center">
      {/* <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="mx-auto w-20 h-20"
      /> */}
      <p className="text-6xl font-bold">{weather.temperature}°C</p>
      <p className="mt-2">{weather.description}</p>
    </div>
  );
}

export default WeatherCard;

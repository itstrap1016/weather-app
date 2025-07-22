import type { Weather } from "@/domain/weather";

interface CurrentWeatherProps {
  weather: Weather;
}

function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <section className="py-15 flex flex-col items-center">
      <h2 className="sr-only">현재 날씨</h2>
      {/* <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="mx-auto w-20 h-20"
      /> */}
      <p className="text-6xl font-bold relative">
        {weather.temperature}
        <span className="text-xl absolute top-0 -right-4">°C</span>
      </p>
      <div className="flex items-center gap-2 mt-2">
        <p>{weather.description}</p>
        <div className="flex items-center gap-0.5">
          <p className="font-medium">{weather.temp_max}°</p>
          <span>/</span>
          <p className="font-medium">{weather.temp_min}°</p>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;

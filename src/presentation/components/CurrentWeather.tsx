import type { Weather, AQI, MinMaxTemp } from "@/domain/weather";

interface CurrentWeatherProps {
  weatherData: Weather;
  aqiData: AQI;
  minMaxTempData: MinMaxTemp;
}

function CurrentWeather({
  weatherData,
  aqiData,
  minMaxTempData,
}: CurrentWeatherProps) {
  return (
    <section className="py-15 flex flex-col items-center">
      <h2 className="sr-only">현재 날씨</h2>
      <div className="flex items-center gap-2">
        <p className="text-6xl font-bold relative">
          {weatherData.temperature}
          <span className="text-xl absolute top-0 -right-4">°C</span>
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt={weatherData.description}
          className="mx-auto w-20 h-20"
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p>{weatherData.description}</p>
        <div className="flex items-center gap-0.5">
          <p>{minMaxTempData.temp_max}°</p>
          <span>/</span>
          <p>{minMaxTempData.temp_min}°</p>
        </div>
      </div>
      <p className="flex gap-2 mt-4">
        <span>AQI</span>
        <span>{aqiData.aqi}</span>
        <span>{aqiData.level}</span>
      </p>
    </section>
  );
}

export default CurrentWeather;

import type { Weather, AQI, MinMaxTemp } from "@/domain/weather";
import { getTemperatureSymbol } from "@/shared/utils/format-temp";

const getAqiColor = (level: string) => {
  switch (level) {
    case "좋음":
      return "text-sky-400";
    case "보통":
      return "text-green-500";
    case "나쁨":
    case "매우 나쁨":
      return "text-red-500";
    default:
      return "";
  }
};

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
          <span className="text-xl absolute top-0 -right-4">
            {getTemperatureSymbol()}
          </span>
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
        <span>AQI {aqiData.aqi}</span>
        <span className={getAqiColor(aqiData.level)}>{aqiData.level}</span>
      </p>
    </section>
  );
}

export default CurrentWeather;

import Navigation from "../components/Navigation";
import CurrentWeather from "../components/CurrentWeather";
import FiveDaysWeatherList from "../components/FiveDaysWeather";
import TwentyFourHoursChart from "../components/TwetyFourHoursChart";
import WindCompass from "../components/WindCompass";
import { useGeolocation } from "@/presentation/hooks/useGeolocation";
import { useWeather } from "@/presentation/hooks/useWeather";
import { useAQI } from "../hooks/useAQI";
import { useFiveDaysWeather } from "../hooks/useFiveDaysWeather";
import { use24HoursWeather } from "../hooks/use24HoursWeather";

function Home() {
  const { location, permission, requestPermission } = useGeolocation();
  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useWeather(location);
  const {
    data: aqiData,
    isLoading: aqiLoading,
    isError: aqiError,
  } = useAQI(location);
  const {
    data: fiveDaysWeatherData,
    isLoading: fiveDaysLoading,
    isError: fiveDaysError,
  } = useFiveDaysWeather(location);
  const {
    data: twentyFourHoursWeatherData,
    isLoading: twentyFourHoursWeatherLoading,
    isError: twentyFourHoursWeatherError,
  } = use24HoursWeather(location);

  if (permission.loading) {
    return (
      <div className="p-4 text-center">위치 정보를 불러오는 중입니다...</div>
    );
  }

  if (permission.denied && permission.error) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4">{permission.error}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={requestPermission}
        >
          위치 권한 다시 요청
        </button>
      </div>
    );
  }

  if (
    weatherLoading ||
    aqiLoading ||
    fiveDaysLoading ||
    twentyFourHoursWeatherLoading
  ) {
    return (
      <div className="p-4 text-center">날씨 정보를 불러오는 중입니다...</div>
    );
  }

  if (
    weatherError ||
    !weatherData ||
    aqiError ||
    !aqiData ||
    fiveDaysError ||
    !fiveDaysWeatherData ||
    twentyFourHoursWeatherError ||
    !twentyFourHoursWeatherData
  ) {
    return (
      <div className="p-4 text-center">날씨 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <>
      <Navigation city={weatherData.city} />
      <CurrentWeather weatherData={weatherData} aqiData={aqiData} />
      <FiveDaysWeatherList data={fiveDaysWeatherData} />
      <TwentyFourHoursChart data={twentyFourHoursWeatherData} />
      <div className="max-w-[680px] px-[20px] mx-auto mt-10 flex gap-2">
        <div className="w-1/2">
          <WindCompass
            speed={weatherData.wind.speed}
            direction={weatherData.wind.direction}
            deg={weatherData.wind.deg}
          />
        </div>
      </div>
    </>
  );
}

export default Home;

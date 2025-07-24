import Navigation from "../components/Navigation";
import CurrentWeather from "../components/CurrentWeather";
import FiveDaysWeatherList from "../components/FiveDaysWeather";
import TwentyFourHoursChart from "../components/TwetyFourHoursChart";
import WindCompass from "../components/WindCompass";
import SunArc from "../components/SunArc";
import CurrentWeatherInfo from "../components/CurrentWeatherInfo";
import { useGeolocation } from "@/presentation/hooks/useGeolocation";
import { useWeather } from "@/presentation/hooks/useWeather";
import { useAQI } from "../hooks/useAQI";
import { useFiveDaysWeather } from "../hooks/useFiveDaysWeather";
import { use24HoursWeather } from "../hooks/use24HoursWeather";
import { useRainProbability } from "../hooks/useRainProbability";
import { SECTION_LAYOUT } from "@/shared/constants/style";
import { useGetMinMaxTemp } from "../hooks/useGetMinMaxTemp";

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
  const {
    data: rainProbabilityData,
    isLoading: rainProbabilityLoading,
    isError: rainProbabilityError,
  } = useRainProbability(location);
  const {
    data: minMaxTempData,
    isLoading: minMaxLoading,
    isError: minMaxError,
  } = useGetMinMaxTemp(location);

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
    twentyFourHoursWeatherLoading ||
    rainProbabilityLoading ||
    minMaxLoading
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
    !twentyFourHoursWeatherData ||
    !rainProbabilityData ||
    rainProbabilityError ||
    !minMaxTempData ||
    minMaxError
  ) {
    return (
      <div className="p-4 text-center">날씨 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <>
      <Navigation city={weatherData.city} />
      <CurrentWeather
        weatherData={weatherData}
        aqiData={aqiData}
        minMaxTempData={minMaxTempData}
      />
      <FiveDaysWeatherList data={fiveDaysWeatherData} />
      <TwentyFourHoursChart data={twentyFourHoursWeatherData} />
      <div className={`${SECTION_LAYOUT} mt-10 flex gap-2 pb-10`}>
        <div className="flex flex-col gap-2 w-1/2">
          <WindCompass
            speed={weatherData.wind.speed}
            direction={weatherData.wind.direction}
            deg={weatherData.wind.deg}
          />
          <SunArc
            sunrise={weatherData.sun.sunrise}
            sunset={weatherData.sun.sunset}
            isDaytime={weatherData.sun.isDaytime}
            progress={weatherData.sun.progress}
          />
        </div>
        <CurrentWeatherInfo
          humidty={weatherData.humidity}
          feels_like={weatherData.feels_like}
          pressure={weatherData.pressure}
          rainProbability={rainProbabilityData}
        />
      </div>
    </>
  );
}

export default Home;

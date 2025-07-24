import Navigation from "../components/Navigation";
import CurrentWeather from "../components/CurrentWeather";
import FiveDaysWeatherList from "../components/FiveDaysWeather";
import TwentyFourHoursChart from "../components/TwetyFourHoursChart";
import WindCompass from "../components/WindCompass";
import SunArc from "../components/SunArc";
import CurrentWeatherInfo from "../components/CurrentWeatherInfo";
import Loading from "../components/Loading";
import RequestLocation from "../components/RequestLocation";
import Error from "../components/Error";
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
    return <Loading text="위치" />;
  }

  if (permission.denied || permission.error) {
    return (
      <RequestLocation
        error={permission.error}
        requestPermission={requestPermission}
      />
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
    return <Loading text="날씨" />;
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
    return <Error />;
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

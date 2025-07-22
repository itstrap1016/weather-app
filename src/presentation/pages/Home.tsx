import Navigation from "../components/Navigation";
import CurrentWeather from "../components/CurrentWeather";

import { useGeolocation } from "@/presentation/hooks/useGeolocation";
import { useWeather } from "@/presentation/hooks/useWeather";
import { useAQI } from "../hooks/useAQI";

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

  if (weatherLoading || aqiLoading) {
    return (
      <div className="p-4 text-center">날씨 정보를 불러오는 중입니다...</div>
    );
  }

  if (weatherError || !weatherData || aqiError || !aqiData) {
    return (
      <div className="p-4 text-center">날씨 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <>
      <Navigation city={weatherData.city} />
      <CurrentWeather weatherData={weatherData} aqiData={aqiData} />
    </>
  );
}

export default Home;

import { useGeolocation } from "@/presentation/hooks/useGeolocation";
import { useWeather } from "@/presentation/hooks/useWeather";
import WeatherCard from "@/presentation/components/WeatherCard";

function Home() {
  const { location, permission, requestPermission } = useGeolocation();
  const {
    data: weather,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useWeather(location);

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

  if (weatherLoading) {
    return (
      <div className="p-4 text-center">날씨 정보를 불러오는 중입니다...</div>
    );
  }

  if (weatherError || !weather) {
    return (
      <div className="p-4 text-center">날씨 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <div className="p-4 flex justify-center">
      <WeatherCard weather={weather} />
    </div>
  );
}

export default Home;

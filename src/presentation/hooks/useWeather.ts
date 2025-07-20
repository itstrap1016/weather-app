import { useQuery } from "@tanstack/react-query";
import DIContainer from "@/infrastructure/container/DIContainer"; // ← 여기서 사용
import type { Weather } from "@/domain/Weather";
import type { Coordinates } from "@/shared/types";

const diContainer = DIContainer.getInstance(); // ← 여기서 사용
const getCurrentWeatherUseCase = diContainer.getGetCurrentWeatherUseCase(); // ← 여기서 사용

export function useWeather(location: Coordinates | null) {
  return useQuery<Weather>({
    queryKey: location ? ["weather", location.lat, location.lon] : [],
    queryFn: () => {
      if (!location) throw new Error("No location");
      return getCurrentWeatherUseCase.execute(location.lat, location.lon); // ← 여기서 사용
    },
    enabled: !!location,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

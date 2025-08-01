import { useQuery } from "@tanstack/react-query";
import type { Weather } from "@/domain/weather";
import { WeatherApiRepository } from "@/infrastructure/repositories";
import { UseCases } from "@/application/use-cases";
import type { Coordinates } from "@/shared/types/common-types";
import { QUERY_CONFIG } from "@/shared/constants/query";

const weatherRepository = new WeatherApiRepository();
const useCases = new UseCases(weatherRepository);

export function useWeather(location: Coordinates | null) {
  return useQuery<Weather>({
    queryKey: location ? ["weather", location.lat, location.lon] : [],
    queryFn: () => {
      if (!location) throw new Error("No location");
      return useCases.getCurrentWeather(location.lat, location.lon); // ← 여기서 사용
    },
    enabled: !!location,
    staleTime: QUERY_CONFIG.DEFAULT_STALE_TIME,
    retry: QUERY_CONFIG.DEFAULT_RETRY_COUNT,
  });
}

import { useQuery } from "@tanstack/react-query";
import type { AQI } from "@/domain/weather";
import { WeatherApiRepository } from "@/infrastructure/repositories";
import { UseCases } from "@/application/use-cases";
import type { Coordinates } from "@/shared/types/common-types";
import { QUERY_CONFIG } from "@/shared/constants/query";

const weatherRepository = new WeatherApiRepository();
const useCases = new UseCases(weatherRepository);

export function useAQI(location: Coordinates | null) {
  return useQuery<AQI>({
    queryKey: location ? ["aqi", location.lat, location.lon] : [],
    queryFn: () => {
      if (!location) throw new Error("No location");
      return useCases.getAQI(location.lat, location.lon);
    },
    enabled: !!location,
    staleTime: QUERY_CONFIG.DEFAULT_STALE_TIME,
    retry: QUERY_CONFIG.DEFAULT_RETRY_COUNT,
  });
}

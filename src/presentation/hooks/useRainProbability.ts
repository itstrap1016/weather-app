import { useQuery } from "@tanstack/react-query";
import type { RainProbability } from "@/domain/weather";
import { WeatherApiRepository } from "@/infrastructure/repositories";
import { UseCases } from "@/application/use-cases";
import type { Coordinates } from "@/shared/types/common-types";
import { QUERY_CONFIG } from "@/shared/constants/query";

const weatherRepository = new WeatherApiRepository();
const useCases = new UseCases(weatherRepository);

export function useRainProbability(location: Coordinates | null) {
  return useQuery<RainProbability>({
    queryKey: location ? ["RainProbability", location.lat, location.lon] : [],
    queryFn: () => {
      if (!location) throw new Error("No location");
      return useCases.getRainProbability(location.lat, location.lon);
    },
    enabled: !!location,
    staleTime: QUERY_CONFIG.DEFAULT_STALE_TIME,
    retry: QUERY_CONFIG.DEFAULT_RETRY_COUNT,
  });
}

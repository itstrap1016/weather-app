import { useQuery } from "@tanstack/react-query";
import type { CityInfo } from "@/domain/weather";
import { WeatherApiRepository } from "@/infrastructure/repositories";
import { UseCases } from "@/application/use-cases";
import { QUERY_CONFIG } from "@/shared/constants/query";

const weatherRepository = new WeatherApiRepository();
const useCases = new UseCases(weatherRepository);

export function useGetCity(cityName: string | null) {
  return useQuery<CityInfo>({
    queryKey: cityName ? ["city", cityName] : [],
    queryFn: () => {
      if (!cityName) throw new Error("No city name");
      return useCases.getCity(cityName);
    },
    enabled: !!cityName,
    staleTime: QUERY_CONFIG.DEFAULT_STALE_TIME,
    retry: QUERY_CONFIG.DEFAULT_RETRY_COUNT,
  });
}

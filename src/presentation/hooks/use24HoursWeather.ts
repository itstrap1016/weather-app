import { useQuery } from "@tanstack/react-query";
import type { TwentyFourHoursWeather } from "@/domain/weather";
import { WeatherApiRepository } from "@/infrastructure/repositories";
import { UseCases } from "@/application/use-cases";
import type { Coordinates } from "@/shared/types/common-types";
import { QUERY_CONFIG } from "@/shared/constants/query";

const weatherRepository = new WeatherApiRepository();
const useCases = new UseCases(weatherRepository);

export function use24HoursWeather(location: Coordinates | null) {
  return useQuery<TwentyFourHoursWeather[]>({
    queryKey: location ? ["24HoursWeather", location.lat, location.lon] : [],
    queryFn: () => {
      if (!location) throw new Error("No location");
      return useCases.get24HoursWeather(location.lat, location.lon);
    },
    enabled: !!location,
    staleTime: QUERY_CONFIG.DEFAULT_STALE_TIME,
    retry: QUERY_CONFIG.DEFAULT_RETRY_COUNT,
  });
}

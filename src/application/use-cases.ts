import type { Weather } from "@/domain/weather";
import type { WeatherRepository } from "./repositories";

export class GetCurrentWeatherUseCase {
  private weatherRepository: WeatherRepository;

  constructor(weatherRepository: WeatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async execute(lat: number, lon: number): Promise<Weather> {
    return await this.weatherRepository.getCurrentWeather(lat, lon);
  }
}

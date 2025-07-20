import type { Weather, WeatherRepository } from "@/domain/Weather";

export class GetCurrentWeatherUseCase {
  private weatherRepository: WeatherRepository;

  constructor(weatherRepository: WeatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async execute(lat: number, lon: number): Promise<Weather> {
    return await this.weatherRepository.getCurrentWeather(lat, lon);
  }
}

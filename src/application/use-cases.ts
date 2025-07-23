import type {
  AQI,
  FiveDaysWeather,
  TwentyFourHoursWeather,
  Weather,
} from "@/domain/weather";
import type { WeatherRepository } from "./repositories";

export class UseCases {
  private weatherRepository: WeatherRepository;

  constructor(weatherRepository: WeatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<Weather> {
    return await this.weatherRepository.getCurrentWeather(lat, lon);
  }

  async getAQI(lat: number, lon: number): Promise<AQI> {
    return await this.weatherRepository.getAQI(lat, lon);
  }

  async getFiveDaysWeather(
    lat: number,
    lon: number
  ): Promise<FiveDaysWeather[]> {
    return await this.weatherRepository.getFiveDaysWeather(lat, lon);
  }

  async get24HoursWeather(
    lat: number,
    lon: number
  ): Promise<TwentyFourHoursWeather[]> {
    return await this.weatherRepository.get24HoursWeather(lat, lon);
  }
}

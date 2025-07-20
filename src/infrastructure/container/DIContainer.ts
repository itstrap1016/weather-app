import { WeatherApiRepository } from "@/infrastructure/WeatherApiRepository";
import { GetCurrentWeatherUseCase } from "@/application/GetCurrentWeatherUseCase";
import type { WeatherRepository } from "@/domain/Weather";

class DIContainer {
  private static instance: DIContainer;
  private weatherRepository: WeatherRepository;
  private getCurrentWeatherUseCase: GetCurrentWeatherUseCase;

  private constructor() {
    this.weatherRepository = new WeatherApiRepository();
    this.getCurrentWeatherUseCase = new GetCurrentWeatherUseCase(
      this.weatherRepository
    );
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  getWeatherRepository(): WeatherRepository {
    return this.weatherRepository;
  }

  getGetCurrentWeatherUseCase(): GetCurrentWeatherUseCase {
    return this.getCurrentWeatherUseCase;
  }
}

export default DIContainer;

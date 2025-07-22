import type { AQI, Weather } from "@/domain/weather";
import { WeatherApiClient } from "@/infrastructure/api/api-client";
import type { WeatherRepository } from "@/application/repositories";

export class WeatherApiRepository implements WeatherRepository {
  private apiClient: WeatherApiClient;

  constructor() {
    this.apiClient = new WeatherApiClient();
  }

  async getCurrentWeather(lat: number, lon: number): Promise<Weather> {
    const data = await this.apiClient.getCurrentWeather(lat, lon);

    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      temp_max: Math.round(data.main.temp_max),
      temp_min: Math.round(data.main.temp_min),
    };
  }

  async getAQI(lat: number, lon: number): Promise<AQI> {
    const data = await this.apiClient.getAQI(lat, lon);

    const getAQILevel = (aqi: number): string => {
      switch (aqi) {
        case 1:
          return "좋음";
        case 2:
          return "보통";
        case 3:
          return "보통";
        case 4:
          return "나쁨";
        case 5:
          return "매우 나쁨";
        default:
          return "알 수 없음";
      }
    };

    return {
      aqi: data.list[0].main.aqi,
      level: getAQILevel(data.list[0].main.aqi),
    };
  }
}

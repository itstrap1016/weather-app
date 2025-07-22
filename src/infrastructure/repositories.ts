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

    console.log(data);

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

    return {
      aqi: data.main.api,
    };
  }
}

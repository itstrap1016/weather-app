import { API_CONFIG } from "@/shared/constants/api";

export class WeatherApiClient {
  private baseUrl: string;
  private apiKey: string;
  private units: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
    this.units = API_CONFIG.DEFAULT_PARAMS.units;
  }

  async getCurrentWeather(lat: number, lon: number) {
    try {
      const url = `${this.baseUrl}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${API_CONFIG.DEFAULT_PARAMS.units}&lang=${API_CONFIG.DEFAULT_PARAMS.lang}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("getCurrentWeather error:", error);
      throw error;
    }
  }

  async getAQI(lat: number, lon: number) {
    try {
      const url = `${this.baseUrl}air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("getAQI error:", error);
      throw error;
    }
  }

  async getFiveDaysWeather(lat: number, lon: number) {
    try {
      const url = `${this.baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.units}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("getAQI error:", error);
      throw error;
    }
  }

  async getCity(cityName: string) {
    try {
      const url = `${this.baseUrl}weather?q=${encodeURIComponent(
        cityName
      )}&appid=${this.apiKey}&units=${this.units}&lang=${
        API_CONFIG.DEFAULT_PARAMS.lang
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`City Search API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("getCity error:", error);
      throw error;
    }
  }
}

import { API_CONFIG } from "@/shared/constants/api";

export class WeatherApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
  }

  async getCurrentWeather(lat: number, lon: number) {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${API_CONFIG.DEFAULT_PARAMS.units}&lang=${API_CONFIG.DEFAULT_PARAMS.lang}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.status}`);
    }

    return response.json();
  }
}

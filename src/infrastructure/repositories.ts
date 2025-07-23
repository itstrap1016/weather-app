import type {
  AQI,
  FiveDaysWeather,
  RainProbability,
  TwentyFourHoursWeather,
  Weather,
} from "@/domain/weather";
import { WeatherApiClient } from "@/infrastructure/api/api-client";
import type { WeatherRepository } from "@/application/repositories";

// API 응답 타입 정의
interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    icon: string;
  }>;
  dt_txt: string;
  pop?: number; // Probability of precipitation (optional)
}

export class WeatherApiRepository implements WeatherRepository {
  private apiClient: WeatherApiClient;

  constructor() {
    this.apiClient = new WeatherApiClient();
  }

  async getCurrentWeather(lat: number, lon: number): Promise<Weather> {
    const data = await this.apiClient.getCurrentWeather(lat, lon);

    const getWindDirection = (deg: number): string => {
      switch (true) {
        case deg >= 337.5 || deg < 22.5:
          return "북";
        case deg >= 22.5 && deg < 67.5:
          return "북동";
        case deg >= 67.5 && deg < 112.5:
          return "동";
        case deg >= 112.5 && deg < 157.5:
          return "남동";
        case deg >= 157.5 && deg < 202.5:
          return "남";
        case deg >= 202.5 && deg < 247.5:
          return "남서";
        case deg >= 247.5 && deg < 292.5:
          return "서";
        case deg >= 292.5 && deg < 337.5:
          return "북서";
        default:
          return "북";
      }
    };

    const msToKmh = (ms: number) => Math.round(ms * 3.6 * 10) / 10;

    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      temp_max: Math.round(data.main.temp_max),
      temp_min: Math.round(data.main.temp_min),
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind: {
        direction: getWindDirection(data.wind.deg),
        speed: msToKmh(data.wind.speed),
        deg: data.wind.deg,
      },
      sun: {
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      },
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

  async getFiveDaysWeather(
    lat: number,
    lon: number
  ): Promise<FiveDaysWeather[]> {
    const data = await this.apiClient.getFiveDaysWeather(lat, lon);
    // 각 날짜의 오전 9시 데이터만 필터링
    const fiveDaysData = data.list
      .filter((item: ForecastItem) => {
        const time = item.dt_txt.split(" ")[1];
        return time === "09:00:00";
      })
      .slice(0, 5)
      .map((item: ForecastItem) => ({
        temparature: Math.round(item.main.temp),
        description: item.weather[0].main,
        icon: item.weather[0].icon,
        date: item.dt_txt.slice(5, 10),
      }));

    return fiveDaysData;
  }

  async get24HoursWeather(
    lat: number,
    lon: number
  ): Promise<TwentyFourHoursWeather[]> {
    const data = await this.apiClient.getFiveDaysWeather(lat, lon);
    const today = new Date().toISOString().split("T")[0];
    const twentyFourHoursData = data.list
      .filter((item: ForecastItem) => {
        const itemDate = item.dt_txt.split(" ")[0];
        return itemDate === today;
      })
      .map((item: ForecastItem) => ({
        temparature: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        time: item.dt_txt.split(" ")[1].slice(0, 5),
      }));

    return twentyFourHoursData;
  }

  async getRainProbability(lat: number, lon: number): Promise<RainProbability> {
    const data = await this.apiClient.getFiveDaysWeather(lat, lon);
    const today = new Date().toISOString().split("T")[0];

    const todayForecasts = data.list.filter((item: ForecastItem) => {
      const itemDate = item.dt_txt.split(" ")[0];
      return itemDate === today;
    });
    const maxPop = Math.max(
      ...todayForecasts.map((item: ForecastItem) => item.pop || 0)
    );

    return Math.round(maxPop * 100); // 0.36 → 36%
  }
}

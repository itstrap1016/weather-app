import type { AQI, FiveDaysWeather, Weather } from "@/domain/weather";
import { WeatherApiClient } from "@/infrastructure/api/api-client";
import type { WeatherRepository } from "@/application/repositories";

// API 응답 타입 정의
interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  dt_txt: string;
}

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

  async getFiveDaysWeather(
    lat: number,
    lon: number
  ): Promise<FiveDaysWeather[]> {
    const data = await this.apiClient.getFiveDaysWeather(lat, lon);

    // 날짜별로 그룹화하고 각 날짜의 마지막(최신) 데이터만 추출
    const fiveDaysData = (
      Object.values(
        data.list.reduce(
          (acc: Record<string, ForecastItem>, item: ForecastItem) => {
            const date = item.dt_txt.split(" ")[0]; // "YYYY-MM-DD" 추출
            acc[date] = item; // 같은 날짜면 덮어쓰기 (자동으로 최신 데이터가 남음)
            return acc;
          },
          {} as Record<string, ForecastItem>
        )
      ) as ForecastItem[]
    )
      .slice(0, 5) // 5일치만 선택
      .map((item: ForecastItem) => ({
        temparature: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        date: item.dt_txt.split(" ")[0],
      }));

    console.log(fiveDaysData);

    return fiveDaysData;
  }
}

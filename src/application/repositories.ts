import type {
  Weather,
  AQI,
  FiveDaysWeather,
  TwentyFourHoursWeather,
} from "@/domain/weather";

// 도메인 레벨에서 외부 데이터 소스에 대한 추상화
export interface WeatherRepository {
  getCurrentWeather(lat: number, lon: number): Promise<Weather>;
  getAQI(lat: number, lon: number): Promise<AQI>;
  getFiveDaysWeather(lat: number, lon: number): Promise<FiveDaysWeather[]>;
  get24HoursWeather(
    lat: number,
    lon: number
  ): Promise<TwentyFourHoursWeather[]>;
}

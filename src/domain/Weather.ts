export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  city: string;
}

// 도메인 레벨에서 외부 데이터 소스에 대한 추상화
export interface WeatherRepository {
  getCurrentWeather(lat: number, lon: number): Promise<Weather>;
}

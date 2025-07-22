export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  city: string;
  temp_max: number;
  temp_min: number;
}

export interface AQI {
  aqi: number;
  level: string;
}

export interface FiveDaysWeather {
  temparature: number;
  description: string;
  icon: string;
  date: string;
}

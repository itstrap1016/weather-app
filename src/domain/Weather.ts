export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  city: string;
  temp_max: number;
  temp_min: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind: {
    speed: number;
    direction: string;
    deg: number;
  };
  sun: {
    sunrise: string;
    sunset: string;
    isDaytime: boolean;
    progress: number;
  };
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

export interface TwentyFourHoursWeather {
  temparature: number;
  icon: string;
  time: string;
}

export type RainProbability = string;

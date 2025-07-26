export interface Weather {
  temperature: number;
  description: string;
  icon: string;
  city: string;
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

export interface MinMaxTemp {
  temp_min: number;
  temp_max: number;
}

export interface City {
  lat: number;
  lon: number;
}

export const TEMPERATURE_UNITS = {
  CELSIUS: "metric",
  FAHRENHEIT: "imperial",
};

export type TemperatureUnit =
  (typeof TEMPERATURE_UNITS)[keyof typeof TEMPERATURE_UNITS];

export const TEMPERATURE_UNIT_KEY = "temperatureUnit";

export const TEMPERATURE_LABELS = {
  metric: "섭씨 (°C)",
  imperial: "화씨 (°F)",
};

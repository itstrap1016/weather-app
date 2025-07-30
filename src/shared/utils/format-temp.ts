import {
  TEMPERATURE_UNITS,
  TEMPERATURE_UNIT_KEY,
} from "@/shared/constants/temp-units";

export function getTemperatureUnit(): string {
  return (
    localStorage.getItem(TEMPERATURE_UNIT_KEY) || TEMPERATURE_UNITS.CELSIUS
  );
}

export function getTemperatureSymbol(): string {
  const unit = getTemperatureUnit();
  return unit === TEMPERATURE_UNITS.FAHRENHEIT ? "°F" : "°C";
}

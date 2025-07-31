// src/shared/utils/unit-converters.ts

import {
  TEMPERATURE_UNITS,
  WIND_SPEED_UNITS,
  PRESSURE_UNITS,
  UNIT_STORAGE_KEYS,
} from "@/shared/constants/unit-settings";

// 풍속 변환 (API는 m/s로 반환)
export function convertWindSpeed(ms: number, toUnit: string): number {
  switch (toUnit) {
    case WIND_SPEED_UNITS.KMH:
      return Math.round(ms * 3.6 * 10) / 10; // m/s to km/h
    case WIND_SPEED_UNITS.MPH:
      return Math.round(ms * 2.237 * 10) / 10; // m/s to mph
    case WIND_SPEED_UNITS.KNOTS:
      return Math.round(ms * 1.944 * 10) / 10; // m/s to knots
    case WIND_SPEED_UNITS.MS:
    default:
      return Math.round(ms * 10) / 10;
  }
}

// 기압 변환 (API는 hPa/mbar로 반환)
export function convertPressure(mbar: number, toUnit: string): number {
  switch (toUnit) {
    case PRESSURE_UNITS.MMHG:
      return Math.round(mbar * 0.75006 * 10) / 10; // mbar to mmHg
    case PRESSURE_UNITS.INHG:
      return Math.round(mbar * 0.02953 * 100) / 100; // mbar to inHg
    case PRESSURE_UNITS.ATM:
      return Math.round(mbar * 0.000987 * 1000) / 1000; // mbar to atm
    case PRESSURE_UNITS.MBAR:
    default:
      return mbar;
  }
}

// 단위 기호 가져오기
export function getWindSpeedSymbol(unit: string): string {
  const symbols = {
    [WIND_SPEED_UNITS.KMH]: "km/h",
    [WIND_SPEED_UNITS.MS]: "m/s",
    [WIND_SPEED_UNITS.MPH]: "mph",
    [WIND_SPEED_UNITS.KNOTS]: "kn",
  };
  return symbols[unit] || "m/s";
}

export function getPressureSymbol(unit: string): string {
  const symbols = {
    [PRESSURE_UNITS.MBAR]: "mbar",
    [PRESSURE_UNITS.MMHG]: "mmHg",
    [PRESSURE_UNITS.INHG]: "inHg",
    [PRESSURE_UNITS.ATM]: "atm",
  };
  return symbols[unit] || "mbar";
}

export function getTemperatureSymbol(): string {
  const unit =
    localStorage.getItem(UNIT_STORAGE_KEYS.TEMPERATURE) ||
    TEMPERATURE_UNITS.CELSIUS;
  return unit === TEMPERATURE_UNITS.FAHRENHEIT ? "°F" : "°C";
}

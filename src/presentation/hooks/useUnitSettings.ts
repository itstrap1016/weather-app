// src/presentation/hooks/useUnitSettings.ts

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  TEMPERATURE_UNITS,
  WIND_SPEED_UNITS,
  PRESSURE_UNITS,
  UNIT_STORAGE_KEYS,
  type TemperatureUnit,
  type WindSpeedUnit,
  type PressureUnit,
} from "@/shared/constants/unit-settings";

export function useUnitSettings() {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(
    TEMPERATURE_UNITS.CELSIUS
  );
  const [windSpeedUnit, setWindSpeedUnit] = useState<WindSpeedUnit>(
    WIND_SPEED_UNITS.KMH
  );
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>(
    PRESSURE_UNITS.MBAR
  );
  const queryClient = useQueryClient();

  // 초기 로드
  useEffect(() => {
    const savedTemp = localStorage.getItem(
      UNIT_STORAGE_KEYS.TEMPERATURE
    ) as TemperatureUnit;
    const savedWind = localStorage.getItem(
      UNIT_STORAGE_KEYS.WIND_SPEED
    ) as WindSpeedUnit;
    const savedPressure = localStorage.getItem(
      UNIT_STORAGE_KEYS.PRESSURE
    ) as PressureUnit;

    if (savedTemp && Object.values(TEMPERATURE_UNITS).includes(savedTemp)) {
      setTemperatureUnit(savedTemp);
    }
    if (savedWind && Object.values(WIND_SPEED_UNITS).includes(savedWind)) {
      setWindSpeedUnit(savedWind);
    }
    if (
      savedPressure &&
      Object.values(PRESSURE_UNITS).includes(savedPressure)
    ) {
      setPressureUnit(savedPressure);
    }
  }, []);

  const changeTemperatureUnit = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
    localStorage.setItem(UNIT_STORAGE_KEYS.TEMPERATURE, unit);
    queryClient.invalidateQueries(); // API 재호출 필요
  };

  const changeWindSpeedUnit = (unit: WindSpeedUnit) => {
    setWindSpeedUnit(unit);
    localStorage.setItem(UNIT_STORAGE_KEYS.WIND_SPEED, unit);
    // API 재호출 불필요 (클라이언트 변환)
  };

  const changePressureUnit = (unit: PressureUnit) => {
    setPressureUnit(unit);
    localStorage.setItem(UNIT_STORAGE_KEYS.PRESSURE, unit);
    // API 재호출 불필요 (클라이언트 변환)
  };

  return {
    temperatureUnit,
    windSpeedUnit,
    pressureUnit,
    changeTemperatureUnit,
    changeWindSpeedUnit,
    changePressureUnit,
  };
}

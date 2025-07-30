import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  TEMPERATURE_UNITS,
  TEMPERATURE_UNIT_KEY,
  type TemperatureUnit,
} from "@/shared/constants/temp-units";

export function useTemperatureUnit() {
  const [unit, setUnit] = useState<TemperatureUnit>(TEMPERATURE_UNITS.CELSIUS);
  const queryClient = useQueryClient();

  useEffect(() => {
    const savedUnit = localStorage.getItem(TEMPERATURE_UNIT_KEY);
    if (savedUnit && Object.values(TEMPERATURE_UNITS).includes(savedUnit)) {
      setUnit(savedUnit);
    }
  }, []);

  const changeUnit = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    localStorage.setItem(TEMPERATURE_UNIT_KEY, newUnit);
    queryClient.invalidateQueries();
  };

  return { unit, changeUnit };
}

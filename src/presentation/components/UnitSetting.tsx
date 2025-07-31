import { useUnitSettings } from "@/presentation/hooks/useUnitSettings";
import {
  TEMPERATURE_UNITS,
  WIND_SPEED_UNITS,
  PRESSURE_UNITS,
  UNIT_LABELS,
  type TemperatureUnit,
  type WindSpeedUnit,
  type PressureUnit,
} from "@/shared/constants/unit-settings";
import { SECTION_LAYOUT } from "@/shared/constants/style";

interface UnitSelectBoxProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Record<string, T>;
  labels: Record<T, string>;
}

function UnitSelectBox<T extends string>({
  label,
  value,
  onChange,
  options,
  labels,
}: UnitSelectBoxProps<T>) {
  return (
    <div className="flex justify-between items-center mt-4">
      <h3 className="">{label}</h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(options).map(([key, optionValue]) => (
          <option key={key} value={optionValue}>
            {labels[optionValue as T]}
          </option>
        ))}
      </select>
    </div>
  );
}

function UnitSetting() {
  const {
    temperatureUnit,
    windSpeedUnit,
    pressureUnit,
    changeTemperatureUnit,
    changeWindSpeedUnit,
    changePressureUnit,
  } = useUnitSettings();

  return (
    <section className={`${SECTION_LAYOUT} py-5 border-b border-gray-200`}>
      <h2 className="font-medium mb-5 text-xl">단위 설정</h2>

      <UnitSelectBox<TemperatureUnit>
        label="온도 단위"
        value={temperatureUnit}
        onChange={changeTemperatureUnit}
        options={TEMPERATURE_UNITS}
        labels={UNIT_LABELS.temperature}
      />

      <UnitSelectBox<WindSpeedUnit>
        label="풍속 단위"
        value={windSpeedUnit}
        onChange={changeWindSpeedUnit}
        options={WIND_SPEED_UNITS}
        labels={UNIT_LABELS.windSpeed}
      />

      <UnitSelectBox<PressureUnit>
        label="기압 단위"
        value={pressureUnit}
        onChange={changePressureUnit}
        options={PRESSURE_UNITS}
        labels={UNIT_LABELS.pressure}
      />
    </section>
  );
}

export default UnitSetting;

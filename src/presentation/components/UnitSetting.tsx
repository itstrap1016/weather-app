import { useTemperatureUnit } from "@/presentation/hooks/useTemperatureUnit";
import {
  TEMPERATURE_UNITS,
  TEMPERATURE_LABELS,
} from "@/shared/constants/temp-units";
import { SECTION_LAYOUT } from "@/shared/constants/style";

function UnitSetting() {
  const { unit, changeUnit } = useTemperatureUnit();

  return (
    <section className={`${SECTION_LAYOUT} py-5 border-b border-gray-200`}>
      <h2 className="font-medium mb-5 text-xl">단위 설정</h2>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">온도 단위</h3>
        <select
          value={unit}
          onChange={(e) => changeUnit(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={TEMPERATURE_UNITS.CELSIUS}>
            {TEMPERATURE_LABELS.metric}
          </option>
          <option value={TEMPERATURE_UNITS.FAHRENHEIT}>
            {TEMPERATURE_LABELS.imperial}
          </option>
        </select>
      </div>
    </section>
  );
}

export default UnitSetting;

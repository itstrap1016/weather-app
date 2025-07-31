import {
  convertPressure,
  getPressureSymbol,
} from "@/shared/utils/unit-converters";
import { UNIT_STORAGE_KEYS } from "@/shared/constants/unit-settings";
import { BOX } from "@/shared/constants/style";

const LI = "flex items-center justify-between";
interface CurrentWeatherInfoProps {
  humidty: number;
  feels_like: number;
  pressure: number;
  rainProbability: string;
}

function CurrentWeatherInfo({
  humidty,
  feels_like,
  pressure,
  rainProbability,
}: CurrentWeatherInfoProps) {
  const pressureUnit =
    localStorage.getItem(UNIT_STORAGE_KEYS.PRESSURE) || "mbar";
  const convertedPressure = convertPressure(pressure, pressureUnit);
  const symbol = getPressureSymbol(pressureUnit);

  return (
    <section className={`${BOX} flex items-center justify-center gap-5 w-1/2`}>
      <h2 className="sr-only">현재 날씨 정보</h2>
      <ul className="w-full max-w-[200px] flex flex-col justify-between h-[80%]">
        <li className={`${LI}`}>
          <span className="text-sm">습도</span>
          <span className="font-medium">{humidty}%</span>
        </li>
        <li className={`${LI}`}>
          <span className="text-sm">체감 온도</span>
          <span className="font-medium">{feels_like}°</span>
        </li>
        <li className={`${LI}`}>
          <span className="text-sm">기압</span>
          <span className="font-medium">
            {convertedPressure}
            {symbol}
          </span>
        </li>
        <li className={`${LI}`}>
          <span className="text-sm">강우확률</span>
          <span className="font-medium">{rainProbability}%</span>
        </li>
      </ul>
    </section>
  );
}

export default CurrentWeatherInfo;

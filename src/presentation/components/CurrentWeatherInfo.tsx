import { BOX } from "@/shared/constants/style";

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
  return (
    <section className={`${BOX} flex items-center justify-center gap-5 w-1/2`}>
      <h2 className="sr-only">현재 날씨 정보</h2>
      <ul>
        <li className="flex items-center">
          <span>습도</span>
          <span>{humidty}%</span>
        </li>
        <li className="flex items-center">
          <span>체감 온도</span>
          <span>{feels_like}°</span>
        </li>
        <li className="flex items-center">
          <span>기압</span>
          <span>{pressure}mbar</span>
        </li>
        <li className="flex items-center">
          <span>강우확률</span>
          <span>{rainProbability}%</span>
        </li>
      </ul>
    </section>
  );
}

export default CurrentWeatherInfo;

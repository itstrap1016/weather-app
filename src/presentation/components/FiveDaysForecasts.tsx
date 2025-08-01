import type { FiveDaysWeather } from "@/domain/weather";
import { SECTION_LAYOUT } from "@/shared/constants/style";

interface FiveDaysWeatherListProps {
  data: FiveDaysWeather[];
}

function FiveDaysForecasts({ data }: FiveDaysWeatherListProps) {
  return (
    <section className={`${SECTION_LAYOUT}`}>
      <h2 className="font-medium text-xl">5일간 일기예보</h2>
      <ul className="mt-5">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.description}
                className="w-12 h-12"
              />
              <p className="flex items-center gap-1">
                <span>{item.date}</span>
                <span>{item.description}</span>
              </p>
            </div>
            <p className="font-medium">{item.temparature}°</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FiveDaysForecasts;

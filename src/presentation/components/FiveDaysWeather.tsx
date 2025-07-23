import type { FiveDaysWeather } from "@/domain/weather";

interface FiveDaysWeatherListProps {
  data: FiveDaysWeather[];
}

function FiveDaysWeatherList({ data }: FiveDaysWeatherListProps) {
  return (
    <section className="max-w-[680px] mx-auto px-5">
      <h2 className="font-medium">5일간 일기예보</h2>
      <ul className="mt-5">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.description}
                className="w-12 h-12"
              />
              <p className="font-medium flex items-center gap-1">
                <span>{item.date}</span>
                <span>{item.description}</span>
              </p>
            </div>
            <p>{item.temparature}°</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FiveDaysWeatherList;

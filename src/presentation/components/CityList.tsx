import { LuTrash2, LuMapPinCheckInside } from "react-icons/lu";
import { SECTION_LAYOUT } from "@/shared/constants/style";
import { useCityList } from "@/presentation/hooks/useCityList";
import { SELECTED_CITY } from "@/shared/constants/storage";
import type { CityInfo, SelectedCity } from "@/domain/weather";

function CityList() {
  const { cityList, removeCityFromList } = useCityList();

  const handleSelectCity = (city: CityInfo) => {
    const selectedCity: SelectedCity = {
      lat: city.lat,
      lon: city.lon,
    };

    localStorage.setItem(SELECTED_CITY, JSON.stringify(selectedCity));
    alert(`${city.name}으로 날씨가 변경되었습니다`);
  };

  return (
    <section className={`${SECTION_LAYOUT} py-5`}>
      <h2 className="font-medium mb-5">저장된 도시 목록</h2>

      {cityList.length === 0 ? (
        <p className="text-center">저장된 도시가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {cityList.map((city) => (
            <li
              key={`${city.name}-${city.lat}-${city.lon}`}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{city.name}</p>
                <p className="text-sm text-gray-500">
                  위도: {city.lat.toFixed(4)}, 경도: {city.lon.toFixed(4)}
                </p>
              </div>
              <div className="flex">
                <button
                  onClick={() => handleSelectCity(city)}
                  className="p-2 hover:bg-green-100 rounded-full transition-colors"
                  aria-label={`${city.name} 선택`}
                >
                  <LuMapPinCheckInside className="w-5 h-5 text-green-500" />
                </button>
                <button
                  onClick={() => removeCityFromList(city, true)}
                  className="p-2 hover:bg-red-100 rounded-full transition-colors"
                  aria-label={`${city.name} 삭제`}
                >
                  <LuTrash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CityList;

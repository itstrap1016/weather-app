import { useState, useEffect } from "react";
import type { CityInfo } from "@/domain/weather";
import {
  CITY_LIST,
  DEFAULT_CITY,
  SELECTED_CITY,
} from "@/shared/constants/storage";

export function useCityList() {
  const [cityList, setCityList] = useState<CityInfo[]>([]);

  // 로컬스토리지에서 cityList 불러오기
  useEffect(() => {
    const storedCityList = localStorage.getItem(CITY_LIST);
    if (storedCityList) {
      setCityList(JSON.parse(storedCityList));
    }
  }, []);

  // cityList에 도시가 있는지 확인
  const isCityInList = (city: CityInfo) => {
    return cityList.some(
      (savedCity) =>
        savedCity.name === city.name &&
        savedCity.lat === city.lat &&
        savedCity.lon === city.lon
    );
  };

  // 도시를 cityList에 추가
  const addCityToList = (city: CityInfo) => {
    const updatedList = [...cityList, city];
    setCityList(updatedList);
    localStorage.setItem(CITY_LIST, JSON.stringify(updatedList));
  };

  // 도시를 cityList에서 제거
  const removeCityFromList = (city: CityInfo, additionalOption?: boolean) => {
    const updatedList = cityList.filter(
      (savedCity) =>
        !(
          savedCity.name === city.name &&
          savedCity.lat === city.lat &&
          savedCity.lon === city.lon
        )
    );
    setCityList(updatedList);
    localStorage.setItem(CITY_LIST, JSON.stringify(updatedList));
    if (additionalOption) {
      const defaultCity = localStorage.getItem(DEFAULT_CITY);
      if (defaultCity) {
        localStorage.setItem(SELECTED_CITY, defaultCity);
      }
    }
  };

  return {
    cityList,
    isCityInList,
    addCityToList,
    removeCityFromList,
  };
}

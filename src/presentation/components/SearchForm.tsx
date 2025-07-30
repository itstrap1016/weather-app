import { useState, useEffect } from "react";
import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";
import { SECTION_LAYOUT } from "@/shared/constants/style";
import { useGetCity } from "@/presentation/hooks/useGetCity";
import { useCityList } from "@/presentation/hooks/useCityList";

function SearchForm() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // 커스텀 훅 사용
  const { isCityInList, addCityToList, removeCityFromList } = useCityList();

  // 디바운싱 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const {
    data: cityData,
    error,
    isLoading,
  } = useGetCity(debouncedValue.trim() || null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className={`py-5 px-5 ${SECTION_LAYOUT}`} onSubmit={handleSubmit}>
      <h2 className="font-medium text-xl mb-5">도시 검색</h2>
      <input
        type="text"
        placeholder="Type City Name"
        value={inputValue}
        onChange={handleInputChange}
        className="px-4 py-2 w-full bg-gray-100 rounded-4xl text-main placeholder:text-gray mb-5"
      />

      {/* 검색 결과 표시 */}
      {isLoading && <p className="text-center">검색 중...</p>}
      {error && <p className="text-center">검색 결과가 없습니다.</p>}
      {cityData && (
        <div className="flex items-center justify-between">
          <p>{cityData.name}</p>
          {isCityInList(cityData) ? (
            <button
              type="button"
              onClick={() => removeCityFromList(cityData)}
              aria-label="도시 제거"
            >
              <LuCircleMinus className="w-5 h-5 text-red-500" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => addCityToList(cityData)}
              aria-label="도시 추가"
            >
              <LuCirclePlus className="w-5 h-5 text-green-500" />
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default SearchForm;

import { SECTION_LAYOUT } from "@/shared/constants/style";
import { SELECTED_CITY, DEFAULT_CITY } from "@/shared/constants/city";
import { useQueryClient } from "@tanstack/react-query";

function Reset() {
  const queryClient = useQueryClient();

  const handleReset = () => {
    const defaultCity = localStorage.getItem(DEFAULT_CITY);

    if (defaultCity) {
      localStorage.setItem(SELECTED_CITY, defaultCity);
      queryClient.invalidateQueries();
      alert("위치가 초기화되었습니다.");
    } else {
      localStorage.removeItem(SELECTED_CITY);
      window.location.reload();
    }
  };

  return (
    <section className={`${SECTION_LAYOUT} py-5`}>
      <h2 className="font-medium mb-5 text-xl">초기화</h2>
      <div className="flex justify-between items-center mt-4">
        <h3>위치</h3>
        <button
          onClick={handleReset}
          className="py-2 px-4 bg-orange rounded-xl text-white font-medium hover:bg-orange-600 transition-colors"
        >
          초기화
        </button>
      </div>
    </section>
  );
}

export default Reset;

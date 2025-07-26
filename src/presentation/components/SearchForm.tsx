import { LuCirclePlus } from "react-icons/lu";
import { SECTION_LAYOUT } from "@/shared/constants/style";

function SearchForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={`py-5 px-5 ${SECTION_LAYOUT}`} onSubmit={handleSubmit}>
      <h2 className="sr-only">도시 검색</h2>
      <input
        type="text"
        placeholder="Type City Name"
        className="px-4 py-2 w-full bg-gray-100 rounded-4xl text-main placeholder:text-gray mb-5"
      />
      <ul>
        <li className="flex items-center justify-between">
          <p>도시이름</p>
          <button>
            <LuCirclePlus className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </form>
  );
}

export default SearchForm;

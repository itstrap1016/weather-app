import { Link, useNavigate } from "react-router-dom";
import { LuSearch, LuSettings, LuArrowLeft } from "react-icons/lu";

interface NavigationProps {
  city?: string;
  backBtn?: boolean;
}

function Navigation({ city, backBtn }: NavigationProps) {
  const navigate = useNavigate();

  return (
    <nav
      className={`h-12 flex items-center shadow-sm sticky top-0 z-20 bg-white px-5 justify-between ${
        backBtn && "justify-start"
      }`}
    >
      {backBtn ? (
        <button onClick={() => navigate(-1)} aria-label="뒤로가기">
          <LuArrowLeft className="w-5 h-5" />
        </button>
      ) : (
        <>
          <Link to="/search">
            <LuSearch className="w-5 h-5" />
          </Link>
          <h1 className="font-medium">{city}</h1>
          <Link to="/setting">
            <LuSettings className="w-5 h-5" />
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;

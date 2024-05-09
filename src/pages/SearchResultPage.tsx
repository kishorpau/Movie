import SearchResultsComponent from "./SearchResult/SearchResult";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const SearchResultPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="bg-black-30 w-full">
      <SearchResultsComponent />
      <button onClick={handleClick}>
        <ArrowLeft />
      </button>
    </div>
  );
};

export default SearchResultPage;

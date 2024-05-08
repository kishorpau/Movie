import SearchResultsComponent from "./SearchResult/SearchResult";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const SearchResultPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <button onClick={handleClick}>
        <ArrowLeft />
      </button>
      <SearchResultsComponent />
    </div>
  );
};

export default SearchResultPage;

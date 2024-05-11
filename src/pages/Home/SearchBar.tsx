import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../../../@/lib/api";
import { setSearchResults } from "../../store/MovieSlice";

import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onClose: (event: React.MouseEvent<SVGElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [error, setError] = useState<string | null>(null); // Explicitly specify type

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term.trim() === "") return;

    try {
      const tvResults = await fetchDataFromApi(
        `/search/multi?query=${term}`,
        {}
      );
      const searchResults = { tv: tvResults };
      dispatch(setSearchResults(searchResults));
      navigate("/Movie/search-results");
      setTerm(""); // Clear input after submission
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Error fetching search results. Please try again."); // Display error message
    }
  };

  return (
    <div className="absolute top-[100%] right-[20%] w-[50%]">
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-center"
      >
        <XIcon onClick={onClose} />
        <input
          type="text"
          value={term}
          placeholder="Search Movies and Shows"
          onChange={(e) => setTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-blue-500"
          aria-label="Search"
        />
        <button
          className="ml-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-black transition duration-300"
          type="submit"
          style={{ borderRadius: "5px" }}
        >
          Go
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
      {/* Display error message if exists */}
    </div>
  );
};

export default SearchBar;

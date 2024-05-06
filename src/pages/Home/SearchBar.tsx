import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../../../@/lib/api";
import { setSearchResults } from "../../store/MovieSlice";
import SearchResultsComponent from "../SearchResult/SearchResult";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (term.trim() === "") return;

    try {
      // Fetch search results for TV shows
      const tvResults = await fetchDataFromApi(
        `/search/multi?query=${term}`,
        ""
      );
      // Fetch search results for movies

      // Combine TV and movie results
      const searchResults = {
        tv: tvResults,
      };

      // Dispatch action to store search results
      dispatch(setSearchResults(searchResults));
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  return (
    <div className="text-black h-full w-full">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={term}
          placeholder="Search Movies and Shows"
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="text-neutral-100" type="submit">
          Go
        </button>
      </form>
      <SearchResultsComponent />
    </div>
  );
};

export default SearchBar;

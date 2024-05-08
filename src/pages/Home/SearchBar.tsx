import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../../../@/lib/api";
import { setSearchResults } from "../../store/MovieSlice";

import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook
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
      // Combine TV and movie results
      const searchResults = {
        tv: tvResults,
      };

      // Dispatch action to store search results
      dispatch(setSearchResults(searchResults));

      // Redirect to search results page
      navigate("/search-results");
    } catch (err) {
      console.error("Error fetching search results:", err);
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
        />
        <button
          className="ml-2 px-4 py-2 rounded-lg bg-gray-800  text-white hover:bg-black transition duration-300"
          type="submit"
          style={{ borderRadius: "5px" }}
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

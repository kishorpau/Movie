import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../../../@/lib/api";
import { setSearchResults } from "../../store/MovieSlice";

import { useNavigate } from "react-router-dom";
//@ts-ignore

const HomeSearch = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook
  const [term, setTerm] = useState("");
  //@ts-ignore

  const submitHandler = async (e) => {
    e.preventDefault();
    if (term.trim() === "") return;

    try {
      // Fetch search results for TV shows
      const tvResults = await fetchDataFromApi(
        `/search/multi?query=${term}`,
        {}
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
    <div className="w-[60%] items-center mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-center"
      >
        <input
          type="text"
          value={term}
          placeholder="Search Movies and Shows"
          onChange={(e) => setTerm(e.target.value)}
          className="w-full h-[55px] px-4 py-2  border  text-xl text-blue-200 bg-black/85 focus:outline-none focus:border-rose-500 "
          style={{
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        />
        <button
          className="px-6 py-2 h-[55px]  bg-gradient-to-r from-rose-600 to-neutral-900 text-blue-200 text-xl transition duration-300"
          type="submit"
          style={{
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default HomeSearch;

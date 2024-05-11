import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TvCard from "../explore/TvCard";
import Navbar from "../Home/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SearchResultsComponent = () => {
  const searchResults = useSelector(
    (state: RootState) => state.home.searchResults
  );
  //@ts-expect-error movieResults doesnt have state so this error doesnt matter
  const movieResults = searchResults.movie?.results || [];
  //@ts-expect-error tvResults doesnt have state so this error doesnt matter
  const tvResults = searchResults.tv?.results || [];
  const combinedResults = [...movieResults, ...tvResults];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  if (!searchResults) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600 bg-black bg-opacity-30 p-4 rounded-lg shadow-lg">
          No search results available
        </div>
      </div>
    );
  }

  if (combinedResults.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600 bg-black bg-opacity-30 p-4 rounded-lg shadow-lg">
          No search results found for movies and TV shows
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative w-full max-h-[85vh] bg-black bg-opacity-30 overflow-y-auto left-0 rounded-md shadow-lg">
        <button
          onClick={handleClick}
          className="absolute top-4 left-4 z-20 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition duration-300"
        >
          <ArrowLeft className="text-black" />
        </button>
        <div className="pt-16 pb-10 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {combinedResults.map((item) => (
            <TvCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              image={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              media={item.title ? "movie" : "tv"}
              overview=""
              name=""
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResultsComponent;

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TvCard from "../explore/TvCard";
import Navbar from "../Home/Navbar";

const SearchResultsComponent = () => {
  const searchResults = useSelector(
    (state: RootState) => state.home.searchResults
  );

  // Check if searchResults is undefined or null
  if (!searchResults) {
    return (
      <div>
        <Navbar />
        <div className="text-center text-gray-600 bg-black/30">
          No search results available
        </div>
      </div>
    );
  }

  // Extract results for movies and TV shows
  //@ts-ignore
  const movieResults = searchResults.movie?.results || [];
  //@ts-ignore
  const tvResults = searchResults.tv?.results || [];

  // Combine movie and TV show results into one array
  const combinedResults = [...movieResults, ...tvResults];

  // Check if combined results are empty
  if (combinedResults.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="text-center text-gray-600 bg-black/30">
          No search results found for movies and TV shows
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className=" absolute w-full max-h-[85vh] bg-black/30 overflow-y-scroll left-0 top-20  rounded-md shadow-lg">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Render combined results */}
          {combinedResults.map((item) => (
            //@ts-ignore
            <TvCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              image={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              media={item.title ? "movie" : "tv"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResultsComponent;

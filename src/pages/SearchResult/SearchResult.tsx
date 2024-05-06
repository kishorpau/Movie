import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TvCard from "../explore/TvCard";

const SearchResultsComponent = () => {
  const searchResults = useSelector(
    (state: RootState) => state.home.searchResults
  );

  // Check if searchResults is undefined or null
  if (!searchResults) {
    return (
      <div className="text-center text-gray-600">
        No search results available
      </div>
    );
  }

  // Extract results for movies and TV shows
  const movieResults = searchResults.movie?.results || [];
  const tvResults = searchResults.tv?.results || [];

  // Combine movie and TV show results into one array
  const combinedResults = [...movieResults, ...tvResults];

  // Check if combined results are empty
  if (combinedResults.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No search results found for movies and TV shows
      </div>
    );
  }

  return (
    <div className="w-full max-h-[50vh] overflow-y-scroll bg-white absolute left-0 top-14 z-10 border border-gray-200 rounded-md shadow-lg">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Render combined results */}
        {combinedResults.map((item) => (
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
  );
};

export default SearchResultsComponent;

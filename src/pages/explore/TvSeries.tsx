import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import TvCard from "./TvCard";

const TvSeries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const { data, loading, error } = useFetch(`/tv/popular?page=${pageNumber}`);
  console.log(data);

  useEffect(() => {
    if (pageNumber === 1) {
      setAllMovies([]);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (data && data.results) {
      setAllMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  const fetchMoreData = () => {
    setPageNumber(pageNumber + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    console.error("Error fetching movies:", error);
    return <div>Error fetching movies. Please try again later.</div>;
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7">
        {allMovies.map((movie) => (
          <TvCard
            key={movie?.id}
            id={movie?.id}
            title={movie.name}
            image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            overview={movie.overview}
            media="tv"
          />
        ))}
        {loading && <div className="col-span-full text-center">Loading...</div>}
        {!loading && data && data.page < data.total_pages && (
          <button
            onClick={fetchMoreData}
            className="col-span-full text-center py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Load More
          </button>
        )}
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          Scroll to Top
        </button>
      </div>
    </div>
  );
};

export default TvSeries;

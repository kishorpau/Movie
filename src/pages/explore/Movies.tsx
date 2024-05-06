import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import TvCard from "./TvCard";
import { fetchDataFromApi } from "../../../@/lib/api";
import GenreComponent from "./GenreComponent";

const Movies = () => {
  const [genre, setGenre] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const genreData = await fetchDataFromApi("/genre/movie/list", {});
        setGenre(genreData.genres);
      } catch (error) {
        console.error("Error fetching genre data:", error);
      }
    };

    fetchGenreData();
  }, []);

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      try {
        const data = await fetchDataFromApi("/discover/movie", {
          include_adult: "false",
          include_video: "false",
          language: "en-US",
          page: "1",
          sort_by: "popularity.desc",
          with_genres: selectedGenres.join(","), // Join selected genres with comma separator
        });
        setFilterData(data);
      } catch (error) {
        console.error("Error fetching filtered movies:", error);
      }
    };

    fetchFilteredMovies();
  }, [selectedGenres]);

  const [pageNumber, setPageNumber] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const { data, loading, error } = useFetch(
    `/discover/movie?page=${pageNumber}`
  );

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

  const handleGenreClick = (id) => {
    // Toggle the presence of genre ID in the selectedGenres array
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  if (error) {
    console.error("Error fetching movies:", error);
    return <div>Error fetching movies. Please try again later.</div>;
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-x-2 gap-y-4">
        {genre.map((genre) => {
          return (
            <GenreComponent
              key={genre?.id}
              name={genre?.name}
              onClick={() => handleGenreClick(genre.id)}
            />
          );
        })}
      </div>
      <div>Sort by</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7">
        {(filterData.results && filterData.results.length > 0) ||
        (selectedGenres.length === 0 && allMovies.length > 0) ? (
          selectedGenres.length === 0 ? (
            allMovies.map((movie) => (
              <TvCard
                key={movie?.id}
                id={movie?.id}
                title={movie.name}
                image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                media="movie"
              />
            ))
          ) : (
            filterData.results.map((movie, index) => (
              <TvCard
                id={movie?.id}
                key={`${movie.title}-${index}`}
                title={movie.title}
                image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                media="movie"
                overview={""}
                name={""}
              />
            ))
          )
        ) : (
          <div className="col-span-full text-center">
            No movies found for the selected genre(s).
          </div>
        )}
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

export default Movies;

import React, { useState, useEffect, useMemo } from "react";
import TvCard from "./TvCard";
import { fetchDataFromApi } from "../../../@/lib/api";
import GenreComponent from "./GenreComponent";
import { SortBy } from "./SortBy";
import Navbar from "../Home/Navbar";

const Movies = () => {
  const [genre, setGenre] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const genreData = await fetchDataFromApi("/genre/movie/list", {});
        setGenre(genreData.genres);
      } catch (error) {
        console.error("Error fetching genre data:", error);
        setError(error);
      }
    };

    fetchGenreData();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchDataFromApi(
          `/discover/movie?sort_by=${sortBy}&page=${pageNumber}&with_genres=${selectedGenres.join(
            ","
          )}`,
          {}
        );
        if (pageNumber === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pageNumber, selectedGenres, sortBy]);

  const handleGenreClick = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const fetchMoreData = () => {
    setPageNumber(pageNumber + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      // Your sorting logic here
    });
  }, [movies]);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-x-2 gap-y-4">
          {genre.map((genre) => (
            <GenreComponent
              key={genre.id}
              name={genre.name}
              onClick={() => handleGenreClick(genre.id)}
            />
          ))}
        </div>
        <div>
          <SortBy onChange={handleSortByChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7">
          {sortedMovies.map((movie, index) => (
            <TvCard
              id={movie.id}
              key={`${movie.title}-${index}`}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              media="movie"
              overview={""}
              name={""}
            />
          ))}
          {loading && (
            <div className="col-span-full text-center">Loading...</div>
          )}
          {!loading && movies.length > 0 && (
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
    </>
  );
};

export default Movies;

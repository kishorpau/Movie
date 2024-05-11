import { useState, useEffect, useMemo } from "react";
import TvCard from "./TvCard";
import { fetchDataFromApi } from "../../../@/lib/api";
import GenreComponent from "./GenreComponent";
import Navbar from "../Home/Navbar";

const Movies = () => {
  const [genre, setGenre] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState<
    { title: string; name: string; id: number; poster_path: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const genreData = await fetchDataFromApi("/genre/tv/list", {});
        setGenre(genreData.genres);
      } catch (error) {
        console.error("Error fetching genre data:", error);

        setError("error");
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
        setMovies(
          pageNumber === 1 ? data.results : [...movies, ...data.results]
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pageNumber, selectedGenres, sortBy]);

  const handleGenreClick = (id: number) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
    setPageNumber(1);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      // Your sorting logic here
      if (a.title < b.title) {
        return -1; // Return a negative number if 'a' should come before 'b'
      }
      if (a.title > b.title) {
        return 1; // Return a positive number if 'a' should come after 'b'
      }
      return 0; // Return 0 if 'a' and 'b' are considered equal
    });
  }, [movies]);
  console.log(error);
  console.log(handleSortByChange);

  return (
    <>
      <div
        className="absolute w-full h-[810px] top-0  bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../../assets/avatar.jpeg)`,
        }}
      >
        <Navbar />
      </div>
      <div className=" absolute top-[60%]">
        <div className="grid grid-cols-8 space-y-2 space-x-5">
          {genre.map((genre) => (
            <GenreComponent
              key={genre.id}
              name={genre.name}
              onClick={() => handleGenreClick(genre.id)}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-[70%] z-10">
        <div className=" mx-auto pt-10 flex">
          <div className=" bg-gradient-to-tr from-slate-900 to-black rounded-lg shadow-lg">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7 w-full">
              {sortedMovies.map((movie, index) => (
                <TvCard
                  key={`${movie.title}-${index}`}
                  title={movie.title}
                  id={movie.id}
                  image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
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
                  className="col-span-full text-center py-2 px-4 w-[8%] bg-blue-500 text-white rounded-md"
                >
                  Load More
                </button>
              )}
              <button
                onClick={scrollToTop}
                className="fixed bottom-10 right-10 bg-rose-500 text-white p-3 rounded-full shadow-lg"
              >
                Scroll to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Movies;

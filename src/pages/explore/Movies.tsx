import useFetch from "../../hooks/useFetch";
import MovieCard from "../../main/MovieCard";
import Navbar from "../Home/Navbar";

const Movies = () => {
  const { data, loading, error } = useFetch("/movie/popular"); // Include error state

  if (error) {
    console.error("Error fetching movies:", error); // Log the error
    return <div>Error fetching movies. Please try again later.</div>; // Show error message
  }

  const imageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap">
          {data?.results.map((movie, index: number) => (
            <MovieCard
              key={index} // Change key to use index if movie ID is not available
              title={movie.title}
              image={`${imageUrl}${movie.backdrop_path}`}
            />
          ))}
        </div>
      )}
      <Navbar />
    </>
  );
};

export default Movies;

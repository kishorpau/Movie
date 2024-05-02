// Details.tsx
import React from "react";
import useFetch from "../../hooks/useFetch";
import MovieAbout from "./MovieAbout";
import MovieCast from "./MovieCast";
import SimilarMovie from "./SimilarMovie";
import Recommendations from "./Recommendations";

const Details: React.FC = () => {
  const ImageUrl = "https://image.tmdb.org/t/p/original";
  const { data, loading, error } = useFetch("/movie/693134");

  if (loading === "loading..") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const movieDetails = {
    title: data?.title || "",
    overview: data?.overview || "",
    bgImage: `${ImageUrl}${data?.backdrop_path}` || "",
    posterImage: `${ImageUrl}${data?.poster_path}` || "",
    genres: data?.genres || [],
    tagline: data?.tagline || "",
    rating: data?.vote_Average,
  };

  return (
    <div className="flex flex-col gap-y-10">
      <MovieAbout {...movieDetails} />
      <MovieCast />
      <SimilarMovie />
      <Recommendations />
    </div>
  );
};

export default Details;

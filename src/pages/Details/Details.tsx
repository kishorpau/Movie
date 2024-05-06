import React from "react";
import useFetch from "../../hooks/useFetch";
import MovieAbout from "./MovieAbout";
import MovieCast from "./MovieCast";
import SimilarMovie from "./SimilarMovie";
import Recommendations from "./Recommendations";
import { useParams } from "react-router-dom";

const Details: React.FC = () => {
  const ImageUrl = "https://image.tmdb.org/t/p/original";
  const { media, id } = useParams<{ media: string; id: string }>();

  if (!id) {
    return <div>Error: Invalid ID</div>;
  }

  const { data, loading, error } = useFetch(`/${media}/${id}`);
  console.log(data);

  if (loading === "loading..") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const movieDetails = {
    title: data?.title || "",
    name: data?.name || "",
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
      <MovieCast id={id} media={media} />
      <SimilarMovie id={id} media={media} />
      <Recommendations id={id} media={media} />
    </div>
  );
};

export default Details;

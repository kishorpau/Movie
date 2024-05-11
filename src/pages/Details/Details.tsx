import useFetch from "../../hooks/useFetch";
import MovieAbout from "./MovieAbout";
import MovieCast from "./MovieCast";
import SimilarMovie from "./SimilarMovie";
import Recommendations from "./Recommendations";
import EmbedVideo from "./EmbedVideo";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const Details: React.FC = () => {
  const ImageUrl = "https://image.tmdb.org/t/p/original";
  const { media, id } = useParams<{ media: string; id: string }>();
  const { data, loading, error } = useFetch(`/${media}/${id}`);
  console.log(data);

  if (!id) {
    return <div>Error: Invalid ID</div>;
  }

  if (loading === "loading..")
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  if (!data) {
    return <div>Error: No data available</div>;
  }

  const movieDetails = {
    title: (data as { title?: string }).title || "",
    name: (data as { name?: string }).name || "",
    overview: (data as { overview?: string }).overview || "",
    //@ts-expect-error i can't put type assertion here
    bgImage: data?.backdrop_path
      ? `${ImageUrl}${(data as { backdrop_path?: string }).backdrop_path}`
      : "/Movie/poster.jpg",
    //@ts-expect-error i can't put type assertion here
    posterImage: data?.poster_path
      ? `${ImageUrl}${(data as { poster_path?: string }).poster_path}`
      : "/Movie/Designer.jpeg",
    genres: (data as { genres?: { name: string }[] }).genres || [],
    tagline: (data as { tagline?: string }).tagline || "",
    rating: (data as { vote_average?: number }).vote_average || "",
    status: (data as { status?: string }).status || "",
    id: String((data as { id?: number }).id || ""),
  };

  return (
    <div className="flex flex-col">
      <MovieAbout
        {...movieDetails}
        media={movieDetails.title.length > 0 ? "movie" : "tv"}
      />
      <div className="bg-rose-50">
        <EmbedVideo id={id} media={media || ""} trailer="video" />

        <MovieCast id={id} media={media || ""} />
        <SimilarMovie id={id} media={media || ""} />
        <Recommendations id={id} media={media || ""} />
      </div>
    </div>
  );
};

export default Details;

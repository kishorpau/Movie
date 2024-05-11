import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../@/components/ui/carousel";
import MovieCard from "../../../main/MovieCard";
import { Loader } from "lucide-react";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie"); // State to track endpoint
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  const ImageUrl = "https://image.tmdb.org/t/p/original";

  const actualdata = data?.results?.slice(0, 20) || [];

  // Function to handle endpoint change
  const handleEndpointChange = (newEndpoint: string) => {
    setEndpoint(newEndpoint);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="h-full w-full">
        <div className="flex justify-center space-x-4 mb-4">
          {/* Button to switch to 'day' endpoint */}
          <button
            onClick={() => handleEndpointChange("movie")}
            style={{
              backgroundColor: endpoint === "movie" ? "#e11d48" : "gray",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              transition: "all 0.5s ease-in-out",
              transform: endpoint === "movie" ? "scale(1.1)" : "scale(1)",
            }}
          >
            Movie
          </button>
          <button
            onClick={() => handleEndpointChange("tv")}
            style={{
              backgroundColor: endpoint === "tv" ? "#e11d48" : "gray",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              transition: "all 0.5s ease-in-out",
              transform: endpoint === "tv" ? "scale(1.1)" : "scale(1)",
            }}
          >
            Tv
          </button>
        </div>
      </div>

      <Carousel
        opts={{ align: "center" }}
        className="w-full max-w-full relative"
      >
        {" "}
        <h1 className="text-2xl font-semibold pb-6 pl-4 ">Top Rated</h1>
        <CarouselContent>
          {actualdata.map((movie) => (
            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
              <MovieCard
                image={`${ImageUrl}${movie.poster_path || ""}`}
                title={movie.title || ""}
                id={movie.id}
                media={movie.title ? "movie" : "tv"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 left-0" />
        {/* CarouselNext button positioned on the far right */}
        <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 right-0" />
      </Carousel>
    </>
  );
};

export default TopRated;

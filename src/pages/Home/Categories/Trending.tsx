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

const Trending = () => {
  const [endpoint, setEndpoint] = useState("week"); // State to track endpoint
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);
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
            onClick={() => handleEndpointChange("day")}
            style={{
              backgroundColor: endpoint === "day" ? "#e11d48" : "gray",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              transition: "all 0.5s ease-in-out",
              transform: endpoint === "movie" ? "scale(1.1)" : "scale(1)",
            }}
          >
            Day
          </button>
          <button
            onClick={() => handleEndpointChange("week")}
            style={{
              backgroundColor: endpoint === "week" ? "#e11d48" : "gray",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              transition: "all 0.5s ease-in-out",
              transform: endpoint === "week" ? "scale(1.1)" : "scale(1)",
            }}
          >
            Week
          </button>
        </div>

        <Carousel
          opts={{ align: "center" }}
          className="w-full max-w-full relative"
        >
          <h1 className="text-2xl font-semibold pb-6 pl-4 ">Trending</h1>
          <CarouselContent>
            {actualdata.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
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
      </div>
    </>
  );
};

export default Trending;

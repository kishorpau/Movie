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

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie"); // State to track endpoint
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const ImageUrl = "https://image.tmdb.org/t/p/original";

  const actualdata = data?.results?.slice(0, 20) || [];

  // Function to handle endpoint change
  const handleEndpointChange = (newEndpoint: string) => {
    setEndpoint(newEndpoint);
  };

  return (
    <>
      <div className="h-full w-full">
        <div className="flex justify-center space-x-4 mb-4">
          {/* Button to switch to 'day' endpoint */}
          <button
            onClick={() => handleEndpointChange("movie")}
            className={`${
              endpoint === "movie" ? "bg-blue-500" : "bg-gray-300"
            } text-white px-4 py-2 rounded-md`}
          >
            Movie
          </button>
          {/* Button to switch to 'week' endpoint */}
          <button
            onClick={() => handleEndpointChange("tv")}
            className={`${
              endpoint === "tv" ? "bg-blue-500" : "bg-gray-300"
            } text-white px-4 py-2 rounded-md`}
          >
            Tv
          </button>
        </div>

        <Carousel
          opts={{ align: "center" }}
          className="w-full max-w-full relative"
        >
          <CarouselContent>
            {actualdata.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <MovieCard
                  image={`${ImageUrl}${movie.poster_path || ""}`}
                  title={movie.title || ""}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="relative top-1/2 transform -translate-y-1/2 left-0" />
          <CarouselNext className="relative top-1/2 transform -translate-y-1/2 right-0" />
        </Carousel>
      </div>
    </>
  );
};

export default Popular;

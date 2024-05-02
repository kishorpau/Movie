import useFetch from "../../hooks/useFetch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@/components/ui/carousel";
import MovieCard from "../../main/MovieCard";

const Recommendations = () => {
  const { data, loading } = useFetch("/movie/693134/recommendations");

  const ImageUrl = "https://image.tmdb.org/t/p/original";
  const actualdata = data?.results?.slice(0, 20) || []; // Initialize with empty array if data is not available

  return (
    <>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-xl relative"
      >
        <CarouselContent>
          {actualdata.map((movie) => (
            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
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
    </>
  );
};

export default Recommendations;

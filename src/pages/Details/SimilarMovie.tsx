import useFetch from "../../hooks/useFetch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@/components/ui/carousel";
import MovieCard from "../../main/MovieCard";
interface Id {
  id: string;
  media: string;
}

const SimilarMovie = ({ id, media }: Id) => {
  const { data } = useFetch(`/${media}/${id}/similar`);

  const ImageUrl = "https://image.tmdb.org/t/p/original";

  const actualdata = data?.results?.slice(0, 20) || []; // Initialize with empty array if data is not available

  return (
    <>
      <div className="h-full w-full">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full max-w-full relative"
        >
          <h1 className="text-2xl font-semibold pb-6 pl-4 ">Similar</h1>
          <CarouselContent>
            {actualdata.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <MovieCard
                  image={
                    movie.poster_path
                      ? `${ImageUrl}${movie.poster_path}`
                      : "../../Designer.jpeg"
                  }
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

export default SimilarMovie;

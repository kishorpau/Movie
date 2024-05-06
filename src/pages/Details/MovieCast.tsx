import useFetch from "../../hooks/useFetch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@/components/ui/carousel";
import CastDetails from "./CastDetails";
interface Id {
  id: string;
  media: string;
}

const MovieCast = ({ id, media }: Id) => {
  const { data: credits, loading } = useFetch(`/${media}/${id}/credits`);

  if (loading === "loading.." || !credits || !credits.cast) {
    return <div>Loading...</div>;
  }

  const cast = credits.cast;

  return (
    <>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-full relative"
      >
        <CarouselContent>
          {cast.map((castItem) => (
            <CarouselItem
              key={castItem.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <CastDetails
                character={castItem.character || ""}
                id={castItem.cast_id || ""}
                name={castItem.name || ""}
                image={castItem.profile_path || ""}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 left-0" />
        <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 right-0" />
      </Carousel>
    </>
  );
};

export default MovieCast;

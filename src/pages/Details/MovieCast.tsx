import useFetch from "../../hooks/useFetch";
import { Loader } from "lucide-react";
import CastDetails from "./CastDetails";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@/components/ui/carousel";

interface CastItem {
  id: number;
  character: string;
  cast_id: number;
  name: string;
  profile_path: string;
}

interface Id {
  id: string;
  media: string;
}

const MovieCast = ({ id, media }: Id) => {
  const { data: credits, loading } = useFetch(`/${media}/${id}/credits`);
  //@ts-expect-error its error
  if (loading === "loading.." || !credits || !credits.cast) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }
  //@ts-expect-error its error
  const cast: CastItem[] = credits.cast || [];

  return (
    <>
      <Carousel
        opts={{ align: "center" }}
        className="w-full max-w-full relative"
      >
        <h1 className="text-2xl font-semibold pb-6 pl-4 ">Cast</h1>
        <CarouselContent>
          {cast.map((castItem) => (
            <CarouselItem
              key={castItem.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <CastDetails
                character={castItem.character || ""}
                id={Number(castItem.cast_id) || 0}
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

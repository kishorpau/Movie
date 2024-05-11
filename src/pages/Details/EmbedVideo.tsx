import React from "react";
import useFetch from "../../hooks/useFetch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../@/components/ui/carousel";
import { Loader } from "lucide-react";

interface Video {
  key: string;
  name?: string;
}

interface EmbedProps {
  media: string;
  id: string;
  trailer: string;
}

const EmbedVideo: React.FC<EmbedProps> = ({ id, media, trailer }) => {
  const { data, loading } = useFetch(`/${media}/${id}/videos`);
  console.log(data);

  if (loading) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }
  //@ts-expect-error it must be of type video
  const videos: Video[] = data?.results.slice(0, 7) || []; // Array of videos

  const trailerNamesInPriorityOrder = [
    "Official Trailer",
    "Trailer",
    "Official Trailer [Subtitled]",
    "Official Trailer 2",
    "Teaser",
    "Official Teaser",
    "50th Anniversary Trailer",
    // Add other trailer names in the order of priority if needed
  ];

  let chosenTrailer: Video | undefined;

  for (const trailerName of trailerNamesInPriorityOrder) {
    chosenTrailer = data?.results?.find(
      (result) => result.name === trailerName
    ) as Video | undefined;
    if (chosenTrailer) {
      break;
    }
  }

  if (!chosenTrailer) {
    return <div>No trailer found.</div>;
  }

  const videoKey = chosenTrailer.key;

  if (trailer === "trailer") {
    // If trailer is "trailer", render the chosen trailer
    return (
      <div className="absolute top-[45%] left-[60%] z-40">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Render the carousel with videos if trailer is "video"
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full max-w-full relative"
    >
      <h1 className="text-2xl font-semibold pb-6 pl-4 ">Videos</h1>
      <CarouselContent>
        {videos.map((video, index) => (
          <CarouselItem
            key={index}
            className={` md:basis-1/2 lg:basis-1/3 ${
              index === 0 ? "pl-0" : "pl-6"
            }`}
          >
            <iframe
              key={index}
              width="480"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/${video.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ marginBottom: "1rem" }} // Add bottom margin to each video
            ></iframe>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 left-0" />
      {/* CarouselNext button positioned on the far right */}
      <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 right-0" />
    </Carousel>
  );
};

export default EmbedVideo;

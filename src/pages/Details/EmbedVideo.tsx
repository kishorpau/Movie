import React from "react";
import useFetch from "../../hooks/useFetch";

interface EmbedProps {
  media: string;
  id: number;
}

const EmbedVideo: React.FC<EmbedProps> = ({ id, media }) => {
  const { data, loading } = useFetch(`/${media}/${id}/videos`);
  //@ts-ignore
  const officialTrailer = data?.results?.find(
    //@ts-ignore
    (result) => result.name === "Official Trailer"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!officialTrailer) {
    return <div>No official trailer found.</div>;
  }

  const videoKey = officialTrailer.key;

  return (
    <div className="absolute top-[25%] left-[25%] right-[25%] z-40">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbedVideo;

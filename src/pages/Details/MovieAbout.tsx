import { useState } from "react";
import EmbedVideo from "./EmbedVideo";
import Navbar from "../Home/Navbar";
import ProgressRing from "../../main/ProgressRing";

interface MovieAboutProps {
  genres: { name: string }[];
  bgImage: string;
  title: string;
  name: string;
  overview: string;
  tagline: string;
  rating: string | number;
  posterImage: string;
  id: string;
  media: string;
  status: string;
}

const MovieAbout: React.FC<MovieAboutProps> = ({
  genres,
  bgImage,
  posterImage,
  title,
  overview,
  tagline,
  rating,
  name,
  id,
  media,
  status,
}) => {
  const [play, setPlay] = useState(false);

  const handleTrailer = () => {
    setPlay(!play);
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
      }}
    >
      <Navbar />
      <div className="flex flex-row justify-between gap-x-[15%] py-20 px-5 md:px-20">
        <div className="relative">
          <img
            src={posterImage}
            alt="posterImage"
            style={{ borderRadius: "5%" }}
            className="rounded-lg shadow-xl w-[190px] md:w-[380px] lg:w-[500px] h-auto"
          />
        </div>
        <div className="flex flex-col gap-y-5 text-white w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">{title || name}</h1>
            <p className="italic">{tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre, index) => (
              <div
                key={index}
                className="bg-orange-500 text-xs md:text-sm text-center rounded-full px-3 py-1"
              >
                {genre.name}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap md:flex-nowrap md:gap-x-5 items-center">
            <ProgressRing
              value={typeof rating === "string" ? parseFloat(rating) : rating}
            />
            <button
              onClick={handleTrailer}
              className="px-2 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition duration-300 text-md"
              style={{ borderRadius: 8 }}
            >
              Play Trailer
            </button>
            {play && (
              <>
                <EmbedVideo id={id} media={media} trailer="trailer" />
                <button
                  onClick={handleTrailer}
                  className="absolute top-[38%] right-7 text-white p-2 m-2 rounded-full"
                  aria-label="Close trailer"
                >
                  ✕
                </button>
              </>
            )}
            <p className="font-semibold">{status}</p>
          </div>
          <p className="w-full md:w-3/5">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieAbout;

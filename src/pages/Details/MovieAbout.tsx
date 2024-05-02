// MovieAbout.tsx
import { useState } from "react";
import EmbedVideo from "./EmbedVideo";

interface MovieAboutProps {
  genres: string[] | number; // Ensure genres is an array of strings
  bgImage: string;
  title: string;
  overview: string;
  tagline: string;
  rating: number;
  posterImage: string;
}

const MovieAbout: React.FC<MovieAboutProps> = ({
  genres,
  bgImage,
  posterImage,
  title,
  overview,
  tagline,
  rating,
}) => {
  const handleTrailer = () => {
    setPlay(!play);
  };

  const [play, setPlay] = useState(false);
  return (
    <div>
      <div className="w-full h-full">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=" h-[100vh] bg-cover flex flex-row gap-x-10"
        >
          <div className="top-[15%] left-[5%] relative ">
            <img
              src={posterImage}
              alt="posterImage"
              style={{ borderRadius: "0.8rem" }}
              height={525}
              width={350}
            />
          </div>
          <div className="flex flex-col gap-y-7 left-[20%] top-[20%] relative text-white w-full">
            <h1>{title}</h1>
            <p>{tagline}</p>
            <p>{rating}</p>
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="bg-orange-500 text-center text-white  p-1 rounded-md inline-flex w-[10rem]"
              >
                {genre.name}
              </div>
            ))}
            <button onClick={handleTrailer}>play trailer</button>
            {play && <EmbedVideo />}
            <p className="w-[40%]">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAbout;

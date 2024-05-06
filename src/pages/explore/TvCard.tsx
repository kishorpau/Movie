import React from "react";
import { Link } from "react-router-dom";

interface MovieProps {
  title: string;
  image: string;
  overview: string;
  id: number;
  media: string;
  name: string;
}

const TvCard: React.FC<MovieProps> = ({
  image,
  title,
  overview,
  id,
  media,
  name,
}) => {
  return (
    <Link to={`/${media}/${id}`}>
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={image}
          alt="Movie Poster"
          className="w-[330.4px] h-[400px] rounded-t-lg object-cover"
        />
        <div className="p-4">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            {title || name}
          </p>
          <p className="text-gray-600">{overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default TvCard;

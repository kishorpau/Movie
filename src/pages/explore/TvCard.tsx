import React, { Suspense } from "react";
import { Link } from "react-router-dom";

// Lazy load the image component
const LazyImage = React.lazy(() => import("./LazyImage"));

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
    <Link to={`/Movie/${media}/${id}`} className="no-underline">
      <div
        className="flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-[475px] bg-gradient-to-tl from-black/50 to-black/80"
        style={{ borderRadius: "5%" }}
      >
        {/* Wrap the image in Suspense and use LazyImage */}
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage
            src={image}
            alt="posterImage"
            style={{ borderRadius: "5%" }}
            className="rounded-lg shadow-xl w-[250px] h-auto pt-5"
          />
        </Suspense>
        <div className="p-5">
          <p className="text-xl font-bold text-white mb-3  hover:text-blue-600">
            {title || name}
          </p>
          <p className="text-gray-600 text-sm">{overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default TvCard;

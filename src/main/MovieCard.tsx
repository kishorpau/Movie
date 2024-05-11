import { Link } from "react-router-dom";

interface MovieProps {
  title: string;
  image: string;
  media: string;
  id: number;
}

const MovieCard = ({ image, title, media, id }: MovieProps) => {
  return (
    <Link to={`/Movie/${media}/${id}`} className="no-underline">
      <div className="w-[400px] h-[525px] ">
        <img
          src={image}
          alt="movie image"
          width={350}
          height={525}
          style={{ borderRadius: "0.8rem" }}
          loading="lazy"
        />
        <p>{title}</p>
        <p>hello</p>
      </div>
    </Link>
  );
};

export default MovieCard;

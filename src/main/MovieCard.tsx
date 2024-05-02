interface MovieProps {
  title: string;
  image: string;
}

const MovieCard = ({ image, title }: MovieProps) => {
  return (
    <div className="w-[400px] h-[525] ">
      <img
        src={image}
        alt="movie image"
        width={350}
        height={525}
        style={{ borderRadius: "0.8rem" }}
      />
      <p>{title}</p>
      <p>hello</p>
    </div>
  );
};

export default MovieCard;

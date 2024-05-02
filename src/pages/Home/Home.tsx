import Navbar from "./Navbar";
import useFetch from "../../hooks/useFetch";
export const Home = () => {
  const { data } = useFetch("/movie/upcoming");
  const ImageUrl = "https://image.tmdb.org/t/p/original";
  const bgImage = `${ImageUrl}${
    data?.results[Math.floor(Math.random() * 20)].backdrop_path
  }`;
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" h-[100vh] bg-cover flex flex-row gap-x-10"
      ></div>
    </>
  );
};

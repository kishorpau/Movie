import Navbar from "./Navbar";
import useFetch from "../../hooks/useFetch";
import Trending from "./Categories/Trending";
import TopRated from "./Categories/TopRated";
import Popular from "./Categories/Popular";
import HomeSearch from "./HomeSearch";

export const Home = () => {
  const { data } = useFetch("/movie/upcoming");
  const ImageUrl = "https://image.tmdb.org/t/p/original";
  const bgImage = `${ImageUrl}${
    data?.results[Math.floor(Math.random() * 20)].backdrop_path
  }`;

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
        }}
        className="bg-cover w-full h-screen"
      >
        <Navbar />
        <div className="w-full h-screen flex justify-center items-center ">
          <div className="w-[100%] flex flex-col">
            <div className="text-blue-200 items-center w-[60%] text-2xl font-sans mx-auto pl-[4.5rem] ">
              <h1 className="pl-[15%] font-bold text-5xl">
                Welcome to <span className="text-rose-600">Cinema</span>
              </h1>
              <p className="p-1 text-blue-200">
                {" "}
                Dive into entertainment with millions of movies and TV shows.
              </p>
              <br />
            </div>
            <HomeSearch />
          </div>
        </div>
        <div className="bg-gradient-to-r from-black/30 to-black/80 relative top-[-8%]">
          <Trending />
          <Popular />
          <TopRated />
        </div>
      </div>
    </>
  );
};

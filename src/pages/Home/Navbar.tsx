import { Search } from "lucide-react";
import { Button } from "../../../@/components/ui/button";
import Logo from "./Logo";
import { Navigate } from "react-router-dom";
import { useState } from "react"; // Import useState hook

const Navbar = () => {
  const [navigateToMovies, setNavigateToMovies] = useState(false); // State to control navigation

  const handleMovie = () => {
    setNavigateToMovies(true); // Set state to true to trigger navigation
  };

  if (navigateToMovies) {
    return <Navigate to="/explore/movies" />;
  }

  return (
    <div className="w-full h-[8vh] bg-black flex p-5 text-white items-center justify-between fixed">
      <Logo />
      <div className=" flex space-x-14">
        <div>
          <Button onClick={handleMovie}>Movies</Button>
        </div>
        <div>
          <Button>Tv Shows</Button>
        </div>
        <div>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Search } from "lucide-react";
import { Button } from "../../../@/components/ui/button";
import Logo from "./Logo";
import { Navigate } from "react-router-dom";
import { useState } from "react"; // Import useState hook
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [navigateToMovies, setNavigateToMovies] = useState(false); // State to control navigation
  const [navigateToTv, setNavigateToTv] = useState(false); // State to control navigation
  const [searchBar, SetSearchBar] = useState(false);

  const handleMovie = () => {
    setNavigateToMovies(true); // Set state to true to trigger navigation
  };
  const handleTv = () => {
    setNavigateToTv(true);
  };

  if (navigateToMovies) {
    return <Navigate to="/explore/movies" />;
  }
  if (navigateToTv) {
    return <Navigate to="/explore/Tv" />;
  }
  const handleSearch = () => {
    SetSearchBar(!searchBar);
  };

  return (
    <div className="w-full h-[8vh] bg-black flex p-5 text-white items-center justify-between fixed">
      <div>
        <Logo />
        <div className=" flex space-x-14">
          <div>
            <Button onClick={handleMovie}>Movies</Button>
          </div>
          <div>
            <Button onClick={handleTv}>Tv Shows</Button>
          </div>
          <div>
            <Button onClick={handleSearch}>
              <Search />
            </Button>
            {searchBar && <SearchBar />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

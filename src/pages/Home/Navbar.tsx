import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { setSearchResults } from "../../store/MovieSlice";
import { Button } from "../../../@/components/ui/button";
import { Menu, Search } from "lucide-react";
import Logo from "./Logo"; // Import the Logo component
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  const handleMovie = () => {
    dispatch(setSearchResults(null));
    navigate("/Movie/explore/movies"); // Use navigate instead of history.push
  };

  const handleTv = () => {
    dispatch(setSearchResults(null));
    navigate("/Movie/explore/Tv"); // Use navigate instead of history.push
  };

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <nav className="w-full h-[8vh] bg-black/30 flex p-5 text-white items-center justify-between sticky top-0 z-10">
      <div>
        <Link to="/Movie">
          <img src="/Movie/file.png" alt="image" height={60} width={70} />
        </Link>
      </div>
      <div className="flex space-x-14">
        <div>
          <Button
            onClick={handleMovie}
            className="text-xl font-sans hover:text-rose-600"
          >
            Movies
          </Button>
        </div>
        <div>
          <Button
            onClick={handleTv}
            className="text-xl font-sans hover:text-rose-600"
          >
            Tv Shows
          </Button>
        </div>
        <div>
          <Button
            onClick={toggleSearchBar}
            className="text-xl font-sans hover:text-rose-600"
          >
            <Search />
          </Button>
          {searchBarVisible && <SearchBar onClose={toggleSearchBar} />}
        </div>
      </div>
      <button className="text-white rounded shadow-md" onClick={toggleSheet}>
        <Menu />
      </button>
      <Logo isOpen={isSheetOpen} onClose={toggleSheet} />
    </nav>
  );
};

export default Navbar;

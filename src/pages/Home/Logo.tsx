import { XIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Logo.js
interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const Logo = ({ isOpen, onClose }: SheetProps) => {
  return (
    isOpen && (
      <div
        className={`fixed inset-y-0 right-0  w-64 h-[70vh] bg-black/60 shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out`}
        style={{ zIndex: 0 }}
      >
        <button
          className="relative float-right top-3.5 right-4 text-neutral-50 border rounded"
          onClick={onClose}
        >
          <XIcon className=" bg-black" />
        </button>
        <div className="text-white py-4 px-6">
          <div className="flex">
            <img src="/Movie/file.png" alt="image" height={60} width={70} />
            <p className="text-2xl font-sans pt-6 px-4 text-rose-500">
              Welcome
            </p>
          </div>
          <div className="text-2xl cursor-pointer px-5 py-4 hover:animate-bounce hover:text-rose-500">
            <Link to="/Movie">Home</Link>
          </div>
          <div className="text-2xl cursor-pointer px-5 py-4 hover:animate-bounce hover:text-rose-500">
            <Link to="/Movie/About">About</Link>
          </div>
          <div className="text-2xl cursor-pointer px-5 py-4 hover:animate-bounce hover:text-rose-500">
            <Link to="/Movie/explore/movies">Movies</Link>
          </div>
          <div className="text-2xl cursor-pointer px-5 py-4 hover:animate-bounce hover:text-rose-500">
            <Link to="/Movie/explore/tv">Tv Shows</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Logo;

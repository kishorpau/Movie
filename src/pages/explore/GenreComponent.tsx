import { useState } from "react";

interface GenreProps {
  name: string;
  onClick: () => void; // Define a callback function prop for handling clicks
}

const GenreComponent = ({ name, onClick }: GenreProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked); // Toggle the clicked state
    onClick(); // Call the onClick handler
  };

  return (
    <div
      className={`cursor-pointer  px-3 py-1 rounded ${
        clicked ? "bg-rose-600" : "bg-gray-600 hover:bg-gray-700"
      }`}
      onClick={handleClick}
    >
      {name}
    </div>
  );
};

export default GenreComponent;

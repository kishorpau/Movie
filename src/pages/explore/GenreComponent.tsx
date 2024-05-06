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
      className={`h-[20px] cursor-pointer ${
        clicked ? "bg-red-500 text-white" : "bg-black text-neutral-100"
      }`}
      onClick={handleClick} // Call the handleClick function when clicked
    >
      <div>{name}</div>
    </div>
  );
};

export default GenreComponent;

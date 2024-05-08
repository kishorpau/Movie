import { XIcon } from "lucide-react";

// Logo.js
interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const Logo = ({ isOpen, onClose }: SheetProps) => {
  return (
    isOpen && (
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-black shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out`}
      >
        <button
          className="relative float-right top-3 right-3 text-neutral-50 border rounded"
          onClick={onClose}
        >
          <XIcon className="animate-pulse" />
        </button>
        <div className="text-white">Hello mate</div>
      </div>
    )
  );
};

export default Logo;

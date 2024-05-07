import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../@/components/ui/sheet";
const Logo = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <div className="h-[50px] w-full z-10 bg">
          <p>hello mate</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Logo;

import Icons from "./Icons";
import Navigation from "./Navigation";
import Search from "./Search";
export default function Header() {
  return (
    <div
      className="flex justify-between items-center shadow-[0_0_20px_4px_rgba(0,0,0,0.25)]
        border border-gray-100"
    >
      <Navigation />
      <Search />
      <Icons />
    </div>
  );
}

import { HomeIcon } from "@heroicons/react/outline";
import { LibraryIcon, SearchIcon } from "@heroicons/react/solid";

function Sidebar() {
  return (
    <div className="text-gray-500 text-sm p-5 border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <hr className="border-t-[1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        {/* <Button colorScheme='blue'>Button</Button> */}
      </div>
    </div>
  );
}

export default Sidebar;

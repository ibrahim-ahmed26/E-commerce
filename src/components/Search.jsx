import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Search() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Search Input */}
      <input
        type="search"
        className="hidden md:block bg-gray-200 outline-0 border border-gray-200 rounded-md px-2 py-2 caret-gray-600 w-1/5 italic"
        placeholder="Search For Anything"
      />

      {/* Mobile Search Icon */}
      <button
        className="md:hidden text-xl"
        onClick={() => setOpen(true)}
      >
        <FaSearch />
      </button>

      {/* Popup Search Overlay for Mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-11/12 p-4 rounded-lg shadow-lg relative">

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-2xl"
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </button>

            {/* Search Input */}
            <input
              type="search"
              autoFocus
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
              placeholder="Search..."
            />
          </div>
        </div>
      )}
    </>
  );
}

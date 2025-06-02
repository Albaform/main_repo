'use client';

import { useState } from "react";

const options = ["공개", "비공개"];

export default function FilterDropdown() {
  const [selected, setSelected] = useState("공개");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-left shadow-sm hover:border-gray-400 focus:outline-none"
      >
        {selected} <span className="float-right">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute mt-1 w-full border border-gray-300 rounded-md bg-white shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                option === selected ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

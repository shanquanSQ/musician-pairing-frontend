import React, { useState, useEffect } from "react";
import "./CategoryDropDown.css";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const CategoryDropDown = ({ inputdata, initialterm, handleSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialterm.toUpperCase()
  );
  const [showDropDown, setShowDropDown] = useState(false);

  const handleChangeCategory = (ev) => {
    setSelectedCategory(ev.target.id.toUpperCase()); // This is necessary to set the displayed text
    handleSelect(ev); // Actual state processing done in Parent component, SearchPage.js
    setShowDropDown(false);
  };

  const handleClickDropdown = (ev) => {
    setShowDropDown(!showDropDown);
  };

  return (
    <>
      <div className="dropdown-container relative">
        <button onClick={handleClickDropdown}>
          <p className="inline text-[2rem] font-semibold focus:outline-none ">
            {selectedCategory}
          </p>
          {"   "}
          <ChevronDownIcon className="h-6 w-6 text-[hsl(209,60%,50%)] inline ml-5 translate-y-[-4px]" />
        </button>

        <div
          className={`dropdown-content max-h-[10rem] overflow-y-auto overflow-x-hidden mt-[.5em] ${
            showDropDown ? "activedropdown" : ""
          }`}
        >
          {inputdata
            ? inputdata.map((element, index) => {
                return (
                  <div
                    key={index}
                    id={element}
                    onClick={handleChangeCategory}
                    className="text-[hsl(209,60%,50%)] text-[1.5rem] scale-100 transition-all hover:text-black hover:scale-110"
                  >
                    {element.toUpperCase()}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

//Import Icons
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";

// Import specific styling
import "./NavBar.css";

export const NavBar = () => {
  const [navToggle, setNavToggle] = useState(false);
  let location = useLocation();

  useEffect(() => {
    // console.log("location hook: ", location.pathname);
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/additionaldetails"
    ) {
      setNavToggle(false);
    }
    // if NOT on the LandingPage or Signup flow
    else {
      if (navToggle === false) {
        setNavToggle(true);
      }
    }
  }, [location, navToggle]);

  return (
    <>
      {navToggle && (
        <nav>
          <NavLink to="userprofile">
            <UserIcon className="h-6 w-6 nav" />
          </NavLink>
          <NavLink to="search">
            <MusicalNoteIcon className="h-6 w-6 scale-[130%] origin-center nav  rounded-[50%]" />
          </NavLink>
          <NavLink to="jamchatroom">
            <ChatBubbleLeftRightIcon className="h-6 w-6 nav" />
          </NavLink>
        </nav>
      )}
    </>
  );
};

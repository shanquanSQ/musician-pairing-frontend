import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

//Import Icons
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

// Import specific styling
import "./NavBar.css";

export const NavBar = () => {
  const [navToggle, setNavToggle] = useState(true);
  let location = useLocation();

  useEffect(() => {
    console.log("location hook: ", location.pathname);
    if (location.pathname == "/" || location.pathname == "/login") {
      console.log("false toggled");
      setNavToggle(false);
    }
    // if NOT on the LandingPage or Signup flow
    else {
      console.log("other branch toggled");
      if (navToggle === false) {
        console.log("true toggled");
        setNavToggle(true);
      }
    }
  }, [location, navToggle]);

  return (
    <>
      {navToggle && (
        <nav>
          <NavLink to="search">
            <div>Search</div>
          </NavLink>
          <NavLink to="profile">
            <div>Profile </div>
          </NavLink>
          <NavLink to="messages">
            <ChatBubbleLeftRightIcon className="h-6 w-6 nav" />
            {/* <div>Messages </div> */}
          </NavLink>
        </nav>
      )}
    </>
  );
};

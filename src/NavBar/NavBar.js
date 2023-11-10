import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <>
      <nav>
        <NavLink to="news">
          <div>Hello </div>
        </NavLink>
      </nav>
    </>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icon-bis">
          <NavLink to="/" className="active-left-nav">
            <i class="fa-solid fa-film"></i>
          </NavLink>
          <br />
          <NavLink to="/trending" className="active-left-nav">
            <i class="fa-solid fa-comments"></i>
          </NavLink>
          <br />
          <NavLink to="/profile" className="active-left-nav">
            <i class="fa-solid fa-user"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;

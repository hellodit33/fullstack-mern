import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  /**
   * @desc uid is a condition for showing the name of the user and welcome, as well as the login or logout icon
   */
  const uid = useContext(UidContext);

  //Redux gets the userdata state
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/hints">
            <div className="logo">
              <img src="./img/icons/hint.png" alt="icon" />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profile">
                <h5>Welcome {userData.pseudo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profile">
                <i className="fa-solid fa-arrow-right-to-bracket login"></i>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

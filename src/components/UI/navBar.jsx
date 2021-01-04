import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  // TODO: NavBar not display in small windows
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/tracking">
            Tracking
          </NavLink>
          <NavLink className="nav-item nav-link" to="/search">
            Search Medical Providers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/calendar">
            Calendar
          </NavLink>
          <NavLink className="nav-item nav-link" to="/records">
            Records
          </NavLink>
          <NavLink className="nav-item nav-link" to="/chat">
            Chat
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

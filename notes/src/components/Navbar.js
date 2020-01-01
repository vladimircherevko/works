import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export function Navbar({ pages }) {
  const { loading } = useContext(FirebaseContext);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <span className="navbar-brand mr-5">Note App</span>
      <ul className="navbar-nav">
        {pages.map(page => (
          <li className="nav-item" key={`key${page.title}`}>
            <NavLink
              className="nav-link"
              to={page.path}
              exact={page.path === "/"}
            >
              {page.title}
            </NavLink>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="navbar-text mx-3">
          <span className="spinner-border spinner-border-sm mx-2"></span>
          Loading...
        </div>
      )}
    </nav>
  );
}

import React from "react";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

export default function Nav(props) {
  const activeStyle = {
    textDecoration: "none",
    backgroundColor: "rebeccapurple",
    color: "white",
    padding: "7px 10px",
    borderRadius: ".35rem",
  };
  return (
    <div className={styles.mainContainer}>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        className={styles.navLink}
        to="/"
      >
        Login/SignUp
      </NavLink>
      {props.userAuth && (
        <>
          <NavLink
            to="/author/posts"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className={styles.navLink}
          >
            Your Posts
          </NavLink>
          <NavLink
            to="/author/create-post"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className={styles.navLink}
          >
            Create Post
          </NavLink>
        </>
      )}
    </div>
  );
}

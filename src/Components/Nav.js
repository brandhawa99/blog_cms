import React from "react";
import "../styles/Nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  const navStyle = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <div className="nav">
      <div className="container">
        <Link style={navStyle} to="/">
          <div className="button">Login/SignUp</div>
        </Link>
        <Link to="/author/posts" style={navStyle}>
          <div className="button">Your Posts</div>
        </Link>
        <Link to="/author/create-post" style={navStyle}>
          <div className="button">Create Post</div>
        </Link>
      </div>
    </div>
  );
}

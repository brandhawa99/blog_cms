import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Post.module.css";
function Post(props) {
  const { title, blog, timestamp } = props;
  var options = { year: "numeric", month: "long", day: "numeric" };
  const navigate = useNavigate();
  if (props.public) {
    return (
      <div
        className={styles.postThingPub}
        onClick={(e) => {
          e.preventDefault();
          navigate(props.id);
        }}
      >
        <h1 className="title">{title}</h1>
        <p className={styles.postBlog}>{blog}</p>
        <p>{new Date(timestamp).toLocaleTimeString("en-US", options)}</p>
        <p>{props.public}</p>
      </div>
    );
  }
  return (
    <div
      className={styles.postThing}
      onClick={(e) => {
        e.preventDefault();
        navigate(props.id);
      }}
    >
      <h1 className="title">{title}</h1>
      <p className={styles.postBlog}>{blog}</p>
      <p>{new Date(timestamp).toLocaleTimeString("en-US", options)}</p>
      <p>{props.public}</p>
    </div>
  );
}

export default Post;

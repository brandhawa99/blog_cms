import { React, useState, useEffect } from "react";
import Post from "../Post/Post";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import styles from "./Posts.module.css";
import Button from "../Button/Button";

export default function Posts(props) {
  const navigate = useNavigate();

  const [postData, setPostsData] = useState([]);
  const [errors, setErrors] = useState(false);

  const data = async () => {
    try {
      const idToken = localStorage.getItem("token");
      const response = await fetch(
        "https://blog-api-h9xk.onrender.com/author/posts",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: idToken,
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        //get the array from the object
        data = data.posts;
        setPostsData(JSON.parse(JSON.stringify(data)));
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("The response was not okay");
    }
  };
  const emptyData = (e) => {
    e.preventDefault();
    navigate("/author/create-post");
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className={styles.mainContainer}>
      {postData.length <= 0 && (
        <Button text="Create Your First Post" click={emptyData} />
      )}

      {postData.map((post) => {
        return (
          <Post
            id={post._id}
            key={post._id}
            title={post.title}
            blog={post.blog}
            public={post.public}
            timestamp={post.timestamp}
          />
        );
      })}
    </div>
  );
}

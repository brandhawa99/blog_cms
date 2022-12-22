import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import TextInput from "../TextInput/TextInput";
import styles from "./UpdateDeletePost.module.css";
import Button from "../Button/Button";
export default function UpdateDeletePost() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDelete, setDelete] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    blog: "",
    public: false,
  });

  const refresh = () => {
    window.location.reload(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const newdata = { ...formData };
    if (e.target.name !== "puclic") {
      newdata[e.target.name] = e.target.value;
      setFormData(newdata);
    }
  };
  const handleOnChange = () => {
    const newdata = { ...formData };
    newdata["public"] = !isChecked;
    setFormData(newdata);
    setIsChecked(!isChecked);
  };

  const getPost = async () => {
    const idToken = localStorage.getItem("token");
    const data = await fetch(
      `https://blog-api-h9xk.onrender.com/author/posts/${params.id}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: idToken,
        },
      }
    );
    const postData = await data.json();
    setFormData(postData.post);
    setIsChecked(postData.post.public);
    setComments(postData.comment);
  };

  const delete_post = async () => {
    try {
      let del = await fetch(
        `https://blog-api-h9xk.onrender.com/author/posts/${params.id}/delete`,
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/author/posts`);
    } catch (error) {
      console.log(error);
    }
  };

  const submit_Form = async (e) => {
    e.preventDefault();
    try {
      fetch("https://blog-api-h9xk.onrender.com/author/posts/update", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: formData.title,
          blog: formData.blog,
          timestamp: formData.timestamp,
          public: isChecked,
          id: formData._id,
        }),
      });
      console.log(formData);
    } catch (error) {}
    navigate("/author/posts");
  };

  const delete_comment = async (id) => {
    await fetch(
      `https://blog-api-h9xk.onrender.com/author/comment/${id}/delete`,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    refresh();
    navigate(`/author/posts/${params.id}`);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formContainer} onSubmit={submit_Form}>
        <div className={styles.public}>
          <label>Public</label>
          <input
            name="public"
            type="checkbox"
            value="public"
            checked={isChecked}
            onChange={handleOnChange}
          ></input>
        </div>
        <TextInput
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          change={handleLogin}
        />

        <textarea
          className={styles.textArea}
          type="textarea"
          placeholder="post"
          name="blog"
          value={formData.blog}
          onChange={(e) => handleLogin(e)}
        />
        <Button text="Update" type="submit" />
      </form>

      {!isDelete && (
        <button
          className={styles.deleteButton}
          style={{ marginBottom: "10px" }}
          onClick={() => {
            setDelete(!isDelete);
          }}
        >
          Delete Post
        </button>
      )}
      {isDelete && (
        <div className={styles.deleteContainer}>
          <span>Are you sure you want to delete this Post</span>
          <button
            className={styles.deleteCancel}
            onClick={() => setDelete(!isDelete)}
          >
            Cancel
          </button>
          <form
            onSubmit={(e) => {
              delete_post();
            }}
          >
            <button
              className={styles.deleteDelete}
              onClick={(e) => {
                e.preventDefault();
                delete_post();
              }}
            >
              Yes I want to delete it
            </button>
          </form>
        </div>
      )}
      <div className={styles.commentContainer}>
        <h1>COMMENTS</h1>
        {comments.length > 0 ? (
          comments.map((com) => {
            return (
              <div key={uuid()} className={styles.comment}>
                <div className={styles.data}>
                  <span className="time">{com.timestamp}</span>
                  <h4>{com.name}</h4>
                  <p>{com.message}</p>
                </div>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    delete_comment(com._id);
                  }}
                >
                  <button type="submit" className="button-delete">
                    delete
                  </button>
                </form>
              </div>
            );
          })
        ) : (
          <h2>NO COMMENTS</h2>
        )}
      </div>
    </div>
  );
}

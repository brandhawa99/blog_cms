import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../TextInput/TextInput";
import styles from "./CreatePost.module.css";
import Button from "../Button/Button";

function CreatePost(props) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    blog: "",
    public: false,
  });

  const handleOnChange = () => {
    const newdata = { ...formData };
    newdata["public"] = !isChecked;
    setFormData(newdata);
    setIsChecked(!isChecked);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newdata = { ...formData };
    if (e.target.name !== "puclic") {
      newdata[e.target.name] = e.target.value;
      setFormData(newdata);
    }
  };
  const submit_Form = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        "https://agile-mesa-41864.herokuapp.com/author/posts/create",
        {
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
            public: formData.public,
          }),
        }
      );
      navigate("/author/posts");
    } catch (error) {}
  };

  return (
    <form className={styles.mainContainer} onSubmit={submit_Form}>
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
        placeholder="Title"
        type="text"
        name="title"
        value={formData.title}
        change={handleLogin}
      />

      <textarea
        className={styles.textArea}
        type="textarea"
        placeholder="Whats on your mind?"
        name="blog"
        value={formData.blog}
        onChange={(e) => handleLogin(e)}
      />
      <Button text="Post" type="submit" />
    </form>
  );
}

export default CreatePost;

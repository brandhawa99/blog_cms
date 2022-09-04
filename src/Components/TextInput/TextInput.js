import React from "react";
import styles from "./TextInput.module.css";

function TextInput(props) {
  const { type, name, value, change, placeholder } = props;
  return (
    <>
      <input
        type={type}
        className={styles.mainContainer}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => change(e)}
      ></input>
    </>
  );
}

export default TextInput;

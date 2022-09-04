import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={styles.mainContainer}
      type={props.type}
      onClick={props.click}
    >
      {props.text}
    </button>
  );
}

export default Button;

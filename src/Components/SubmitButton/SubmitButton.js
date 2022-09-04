import React from "react";
import styles from "./SubmitButton.module.css";

function SubmitButton(props) {
  const { text, click } = props;

  return (
    <>
      <button onClick={click} className={styles.submitButton}>
        {text}
      </button>
    </>
  );
}

export default SubmitButton;

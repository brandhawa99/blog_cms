import React from "react";
import styles from "./SignUp.module.css";
import TextInput from "../TextInput/TextInput";
import SubmitButton from "../SubmitButton/SubmitButton";
export default function SignUp(props) {
  return (
    <form className={styles.mainContainer}>
      <TextInput
        type="text"
        name="first_name"
        placeholder="first name"
        change={props.handleLogin}
      />

      <TextInput
        type="text"
        name="last_name"
        value={props.loginData.last_name}
        change={props.handleLogin}
        placeholder="last name"
      />
      <TextInput
        type="password"
        name="password"
        value={props.loginData.password}
        placeholder="password"
        change={props.handleLogin}
      />
      <TextInput
        type="password"
        name="password2"
        value={props.loginData.password2}
        placeholder="confirm password"
        change={props.handleLogin}
      />
      <SubmitButton text="Sign Up" click={props.loginSubmit} />
    </form>
  );
}

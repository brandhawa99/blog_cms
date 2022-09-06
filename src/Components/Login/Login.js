import React from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import TextInput from "../TextInput/TextInput";
import styles from "./Login.module.css";

export default function Login(props) {
  return (
    <form className={styles.mainContainer}>
      <TextInput
        type="text"
        name="username"
        placeholder="username"
        value={props.loginData.username}
        change={props.handleLogin}
      />

      <TextInput
        name="password"
        type="password"
        placeholder={"password"}
        value={props.loginData.password}
        change={props.handleLogin}
      />
      <SubmitButton text="Login" click={props.loginSubmit} />
    </form>
  );
}

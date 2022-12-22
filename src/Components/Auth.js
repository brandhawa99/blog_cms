import { React, useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import "../styles/Auth.css";
import { v4 as uuid } from "uuid";
import Button from "./Button/Button";

function Auth(props) {
  const [errors, setErrors] = useState([]);

  const [loginForm, setLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const newdata = { ...loginData };
    newdata[e.target.name] = e.target.value;
    setLoginData(newdata);
  };
  const handleSignup = (e) => {
    e.preventDefault();
    const newdata = { ...signupData };
    newdata[e.target.name] = e.target.value;
    setSignupData(newdata);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://blog-api-h9xk.onrender.com/auth/login",
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      const valid = await response.json();
      if (response.status === 200) {
        props.setUserAuth(true);
        localStorage.setItem("token", valid.token);
        localStorage.setItem("expires", valid.expiresIn);
      } else {
        let item = JSON.parse(JSON.stringify(valid));
        setErrors(item.error);
        throw new Error("Login Error");
      }
    } catch (error) {}
  };
  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://blog-api-h9xk.onrender.com/auth/signup",
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: signupData.first_name,
            last_name: signupData.last_name,
            username: signupData.username,
            password: signupData.password,
            password2: signupData.password2,
          }),
        }
      );
      const valid = await response.json();
      if (response.status === 200) {
        props.setUserAuth(true);
        localStorage.setItem("token", valid.token);
        localStorage.setItem("expires", valid.expiresIn);
      } else {
        let item = JSON.parse(JSON.stringify(valid));
        setErrors(item.error);
        throw new Error(valid);
      }
    } catch (error) {}
  };

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    props.setUserAuth(false);
  }

  return (
    <div className="auth">
      {!props.userAuth ? (
        <div>
          {loginForm ? (
            <Login
              userAuth={props.userAuth}
              loginSubmit={loginSubmit}
              handleLogin={handleLogin}
              loginData={loginData}
            />
          ) : (
            <SignUp
              userAuth={props.userAuth}
              loginSubmit={signupSubmit}
              handleLogin={handleSignup}
              loginData={signupData}
            />
          )}
          {errors.length > 0 &&
            errors.map((item) => {
              return (
                <div className="error-message" key={uuid()}>
                  {item.msg}
                </div>
              );
            })}
          <button
            className="switch-button"
            onClick={(e) => {
              e.preventDefault();
              setLoginForm(!loginForm);
            }}
          >
            Switch to {loginForm ? "Sign Up" : "Login"}
          </button>
        </div>
      ) : (
        <div className="loggedIn">
          <Button text="Log Out!" click={logOut} />
        </div>
      )}
    </div>
  );
}

export default Auth;

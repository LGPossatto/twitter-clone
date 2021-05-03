import { useState, useContext } from "react";

import UserContext from "../../context/user/userContext";

import "./loginForm.style.scss";
import LoginInput from "../login-input/LoginInput.component";

const LoginForm = () => {
  const { loginWithEmail } = useContext(UserContext);
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  return (
    <form className="login-form">
      <h2 className="fs-bigger">{"Log in to Twitter"}</h2>
      <LoginInput
        state={logInEmail}
        setState={setLogInEmail}
        inputName="Email"
        type="email"
        ctrlClass="email"
      ></LoginInput>
      <LoginInput
        state={logInPassword}
        setState={setLogInPassword}
        inputName="Password"
        type="password"
        ctrlClass="password"
      ></LoginInput>
      <input
        type="button"
        value="Login In"
        className="login-form__btn"
        onClick={() => {
          loginWithEmail(logInEmail, logInPassword);
        }}
      />
    </form>
  );
};

export default LoginForm;

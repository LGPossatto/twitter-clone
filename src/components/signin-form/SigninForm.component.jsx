import { useState, useContext } from "react";

import UserContext from "../../context/user/userContext";

import "./signinForm.style.scss";
import LoginInput from "../login-input/LoginInput.component";

const SigninForm = () => {
  const { createAccount } = useContext(UserContext);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userBd, setUserBd] = useState("");
  const [userCity, setUserCity] = useState("");

  return (
    <form className="signin-form">
      <h2 className="fs-bigger">Create an Account</h2>
      <LoginInput
        state={signInEmail}
        setState={setSignInEmail}
        inputName="Email"
        type="email"
        ctrlClass="email"
      ></LoginInput>
      <LoginInput
        state={signInPassword}
        setState={setSignInPassword}
        inputName="Password"
        type="password"
        ctrlClass="password"
      ></LoginInput>
      <LoginInput
        state={userName}
        setState={setUserName}
        inputName="Name"
        type="text"
        ctrlClass="name"
      ></LoginInput>
      <LoginInput
        state={userBio}
        setState={setUserBio}
        inputName="Say something about you"
        type="text"
        ctrlClass="user-bio"
      ></LoginInput>
      <LoginInput
        state={userBd}
        setState={setUserBd}
        inputName="Birthday (dd/mm/yyyy)"
        type="text"
        ctrlClass="user-bd"
      ></LoginInput>
      <LoginInput
        state={userCity}
        setState={setUserCity}
        inputName="What city are you in right now?"
        type="text"
        ctrlClass="user-city"
      ></LoginInput>

      <input
        type="button"
        value="Sign In"
        className="signin-form__btn"
        onClick={() => {
          createAccount(
            signInEmail,
            signInPassword,
            userName,
            userBio,
            userBd,
            userCity
          );
        }}
      />
    </form>
  );
};

export default SigninForm;

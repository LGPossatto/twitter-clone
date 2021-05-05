import { useState, useContext } from "react";

import UserContext from "../../context/user/userContext";
import { leapYear } from "../../utils/utils";

import "./signinForm.style.scss";
import LoginInput from "../login-input/LoginInput.component";

const SigninForm = () => {
  const { createAccount } = useContext(UserContext);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userBdDay, setUserBdDay] = useState("");
  const [userBdMonth, setUserBdMonth] = useState("");
  const [userBdYear, setUserBdYear] = useState("");
  const [userCity, setUserCity] = useState("");

  const verifyDate = (day, month, year) => {
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    if (
      (month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12) &&
      day > 0 &&
      day <= 31 &&
      year > 1900 &&
      year <= new Date().getFullYear()
    ) {
      return true;
    } else if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 0 &&
      day <= 30 &&
      year > 1900 &&
      year <= new Date().getFullYear()
    ) {
      return true;
    } else if (month === 2) {
      let maxDay = 28;
      if (leapYear(year)) {
        maxDay++;
      }

      if (
        day > 0 &&
        day <= maxDay &&
        year > 1900 &&
        year <= new Date().getFullYear()
      ) {
        return true;
      }
    } else {
      console.log(day, month, year);
      return false;
    }
  };

  return (
    <form className="signin-form">
      <i className="fab fa-twitter fs-biggest"></i>
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
        state={confirmPassword}
        setState={setConfirmPassword}
        inputName="Confirm Password"
        type="password"
        ctrlClass="confirm-password"
      ></LoginInput>
      <LoginInput
        state={userName}
        setState={setUserName}
        inputName="Name"
        type="text"
        ctrlClass="name"
        charLimit={32}
      ></LoginInput>
      <LoginInput
        state={userBio}
        setState={setUserBio}
        inputName="Say something about you"
        type="text"
        ctrlClass="user-bio"
      ></LoginInput>
      <p className="fs-med fc-secondary">Birthday</p>
      <div className="flex jc-sb">
        <LoginInput
          state={userBdDay}
          setState={setUserBdDay}
          inputName="Day"
          type="text"
          ctrlClass="day"
          small
          charLimit={2}
        ></LoginInput>
        <LoginInput
          state={userBdMonth}
          setState={setUserBdMonth}
          inputName="Month"
          type="text"
          ctrlClass="month"
          small
          charLimit={2}
        ></LoginInput>
        <LoginInput
          state={userBdYear}
          setState={setUserBdYear}
          inputName="Year"
          type="text"
          ctrlClass="year"
          small
          charLimit={4}
        ></LoginInput>
      </div>
      <LoginInput
        state={userCity}
        setState={setUserCity}
        inputName="What city are you in right now?"
        type="text"
        ctrlClass="user-city"
        charLimit={20}
      ></LoginInput>

      <input
        type="button"
        value="Sign In"
        className="signin-form__btn"
        onClick={() => {
          if (
            signInPassword === confirmPassword &&
            verifyDate(userBdDay, userBdMonth, userBdYear)
          ) {
            createAccount(
              signInEmail,
              signInPassword,
              userName,
              userBio,
              `${userBdDay}/${userBdMonth}/${userBdYear}`,
              userCity
            );
          } else if (signInPassword !== confirmPassword) {
            alert("Please enter the same password!");
          } else if (!verifyDate(userBdDay, userBdMonth, userBdYear)) {
            alert("Something is wrong with your birthday.");
          }
        }}
      />
    </form>
  );
};

export default SigninForm;

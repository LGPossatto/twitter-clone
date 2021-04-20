import PropTypes from "prop-types";

import "./form.style.scss";
import LoginInput from "../login-input/LoginInput.component";

const Form = ({
  title,
  btnText,
  onSubmit,
  emailState,
  setEmailState,
  passwordState,
  setPasswordState,
  profileInfo,
}) => {
  return (
    <form className="form">
      <h2 className="fs-bigger">{title}</h2>
      <LoginInput
        state={emailState}
        setState={setEmailState}
        inputName="Email"
        type="email"
        ctrlClass="email"
      ></LoginInput>
      <LoginInput
        state={passwordState}
        setState={setPasswordState}
        inputName="Password"
        type="password"
        ctrlClass="password"
      ></LoginInput>
      {profileInfo &&
        profileInfo.map((item) => {
          return (
            <LoginInput
              key={item[2]}
              state={item[0]}
              setState={item[1]}
              inputName={item[2]}
              type="text"
              ctrlClass={item[2].slice(0, 3)}
            ></LoginInput>
          );
        })}
      <input
        type="button"
        value={btnText}
        className={"form__btn"}
        onClick={() => {
          if (profileInfo) {
            onSubmit(emailState, passwordState, profileInfo);
          } else {
            onSubmit(emailState, passwordState);
          }
        }}
      />
    </form>
  );
};

Form.proppTypes = {
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  emailState: PropTypes.string.isRequired,
  setEmailState: PropTypes.string.isRequired,
  passwordState: PropTypes.string.isRequired,
  setPasswordState: PropTypes.string.isRequired,
  profileInfo: PropTypes.array,
};

export default Form;

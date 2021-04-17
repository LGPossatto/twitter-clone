import PropTypes from "prop-types";

import "./form.style.scss";
import LoginInput from "../input/LoginInput.component";

const Form = ({
  title,
  btnText,
  onSubmit,
  emailState,
  setEmailState,
  passwordState,
  setPasswordState,
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
      <input
        type="button"
        value={btnText}
        className={"form__btn"}
        onClick={() => {
          onSubmit(emailState, passwordState);
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
};

export default Form;

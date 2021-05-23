import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./loginInput.style.scss";

const LoginInput = ({
  state,
  setState,
  inputName,
  type,
  ctrlClass,
  small,
  charLimit = 154,
}) => {
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    if (
      e.target.classList.contains(ctrlClass) &&
      (e.target.classList.contains("login-input") ||
        e.target.classList.contains("label") ||
        e.target.classList.contains("input"))
    ) {
      setActive(true);
    } else if (inputRef.current.value === "") {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    if (inputRef.current.value === "") {
      setActive(false);
    } else {
      setActive(true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`login-input ${ctrlClass} ${active ? "active" : ""} ${
        small ? "small" : ""
      }`}
      onClick={() => inputRef.current.focus()}
    >
      <label
        htmlFor={inputName}
        className={`label fs-med fc-secondary ${ctrlClass}`}
        onClick={() => inputRef.current.focus()}
      >
        {inputName}
      </label>
      <input
        className={`input fs-med ${ctrlClass}`}
        name={inputName}
        type={type}
        value={state}
        ref={inputRef}
        required
        onFocus={() => setActive(true)}
        onChange={(e) => {
          if (state.length < charLimit) {
            setState(e.target.value);
          } else if (!e.nativeEvent.data) {
            setState(e.target.value);
          }
        }}
      />
    </div>
  );
};

LoginInput.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ctrlClass: PropTypes.string.isRequired,
  small: PropTypes.bool,
  charLimit: PropTypes.number,
};

export default LoginInput;

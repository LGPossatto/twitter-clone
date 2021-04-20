import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./loginInput.style.scss";

const LoginInput = ({ state, setState, inputName, type, ctrlClass }) => {
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
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`login-input ${ctrlClass} ${active ? "active" : ""}`}
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
        onChange={(e) => {
          setState(e.target.value);
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
};

export default LoginInput;

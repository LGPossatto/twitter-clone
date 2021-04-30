import React from "react";
import PropTypes from "prop-types";

import "./btn.style.scss";

const Btn = ({ text, no_bg, block, med, small, onClick }) => {
  return (
    <button
      className={`btn ${med ? "fs-med" : "fs-big"}${small ? "fs-small" : ""} ${
        no_bg && "no-bg"
      } ${block && "block"}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {text}
    </button>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  no_bg: PropTypes.bool,
  block: PropTypes.bool,
  med: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Btn;

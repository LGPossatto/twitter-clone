import React from "react";
import PropTypes from "prop-types";

import "./btn.style.scss";

const Btn = ({ text, no_bg, block, med, onClick }) => {
  return (
    <button
      className={`btn fs-${med ? "med" : "big"} ${no_bg && "no-bg"} ${
        block && "block"
      }`}
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
  onClick: PropTypes.func,
};

export default Btn;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { toUTC } from "../../utils/utils";

import "./btn.style.scss";

const Btn = ({ text, url, no_bg, block, med, onClick, message }) => {
  return (
    <Link
      to={url}
      className={`btn fs-${med ? "med" : "big"} ${no_bg && "no-bg"} ${
        block && "block"
      }`}
      onClick={() => {
        if (onClick) {
          console.log("onclick");
          onClick({ message: message, date: toUTC(new Date()) });
        }
      }}
    >
      {text}
    </Link>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  no_bg: PropTypes.bool,
  block: PropTypes.bool,
  med: PropTypes.bool,
  onClick: PropTypes.func,
  message: PropTypes.string,
};

export default Btn;

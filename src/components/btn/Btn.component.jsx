import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./btn.style.scss";

const Btn = ({ text, url, no_bg, block, med }) => {
  return (
    <Link
      to={url}
      className={`btn fs-${med ? "med" : "big"} ${no_bg && "no-bg"} ${
        block && "block"
      }`}
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
};

export default Btn;

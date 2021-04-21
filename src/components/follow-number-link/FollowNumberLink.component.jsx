import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./followNumberLink.style.scss";

const FollowNumberLink = ({ number, text, url }) => {
  return (
    <Link to={url} className="follow-number-link">
      <span className="fs-med">
        {number} <span className="fc-secondary">{text}</span>
      </span>
    </Link>
  );
};

FollowNumberLink.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default FollowNumberLink;

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./feedMenuItem.style.scss";

const FeedMenuItem = ({ text, url, active }) => {
  return (
    <Link
      to={url}
      className={`feed-menu-item fs-med ${active ? "active" : ""}`}
    >
      {text}
    </Link>
  );
};

FeedMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default FeedMenuItem;

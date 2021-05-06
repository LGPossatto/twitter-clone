import PropTypes from "prop-types";

import "./feedMenuItem.style.scss";

const FeedMenuItem = ({ text, active, setActive }) => {
  return (
    <button
      onClick={setActive}
      className={`feed-menu-item fs-med ${active ? "active" : ""}`}
    >
      {text}
    </button>
  );
};

FeedMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default FeedMenuItem;

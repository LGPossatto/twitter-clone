import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./tweetBtn.style.scss";

const TweetBtn = ({ url, type, icon }) => {
  return (
    <Link to={url} className={`tweet-btn fs-med fc-secondary ${type}`}>
      <i class={`fs-med fc-secondary ${icon}`}></i>
      25.7K
    </Link>
  );
};

TweetBtn.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default TweetBtn;

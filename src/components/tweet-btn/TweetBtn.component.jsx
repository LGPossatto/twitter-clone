import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./tweetBtn.style.scss";

const TweetBtn = ({ url, type, icon, usersList, postLike }) => {
  const [active, setActive] = useState(false);

  return (
    <Link
      to={url}
      onClick={postLike}
      className={`tweet-btn fs-med fc-secondary ${type}`}
    >
      <i className={`fs-med fc-secondary ${icon}`}></i>
      {usersList.length}
    </Link>
  );
};

TweetBtn.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  usersList: PropTypes.array.isRequired,
  postLike: PropTypes.func.isRequired,
};

export default TweetBtn;

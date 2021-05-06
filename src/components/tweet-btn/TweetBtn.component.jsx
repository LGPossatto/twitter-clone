import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import UserContext from "../../context/user/userContext";

import "./tweetBtn.style.scss";

const TweetBtn = ({
  url,
  type,
  icon,
  usersList,
  userUID,
  toPost,
  toRemove,
}) => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (usersList.includes(user.userUID)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [usersList, userUID]);

  return (
    <Link
      to={url}
      onClick={() => {
        if (active) {
          toRemove();
        } else {
          toPost();
        }
      }}
      className={`tweet-btn fs-med fc-secondary ${type} ${
        active ? `active-${type}` : ""
      }`}
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
  userUID: PropTypes.string.isRequired,
  toPost: PropTypes.func.isRequired,
  toRemove: PropTypes.func.isRequired,
};

export default TweetBtn;

import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import UserContext from "../../context/user/userContext";

import "./tweetBtn.style.scss";

const TweetBtn = ({ type, icon, usersList, userUID, toPost, toRemove }) => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (usersList.includes(user.userUID)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [usersList, userUID, user.userUID]);

  return (
    <button
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
    </button>
  );
};

TweetBtn.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  usersList: PropTypes.array.isRequired,
  userUID: PropTypes.string.isRequired,
  toPost: PropTypes.func.isRequired,
  toRemove: PropTypes.func.isRequired,
};

export default TweetBtn;

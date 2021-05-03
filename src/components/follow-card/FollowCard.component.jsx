import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import UserContext from "../../context/user/userContext";

import "./followCard.style.scss";
import profileImg from "../../assets/images/twiter-profile.jpg";
import Btn from "../btn/Btn.component";

const FollowCard = ({ userName, login, userUID }) => {
  const { following, followUser, unfollowUser } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);

  const followFunc = () => {
    if (isFollowing) {
      unfollowUser(userUID);
    } else {
      followUser(userUID);
    }
  };

  useEffect(() => {
    if (following.followingList.includes(userUID)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [following]);

  return (
    <div className="follow-card flex ai-c">
      <div className="img-box">
        <img src={profileImg} alt="profile" />
      </div>
      <div className="info-box flex jc-sb ai-c">
        <div className="info-text-box">
          <h2 className="fs-med">{userName}</h2>
          <span className="fs-med fc-secondary">{login}</span>
        </div>
        <Btn
          text={`${isFollowing ? "Unfollow" : "Follow"}`}
          onClick={followFunc}
          no_bg={!isFollowing}
          med
          isFollowing
        ></Btn>
      </div>
    </div>
  );
};

FollowCard.propTypes = {
  userName: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  userUID: PropTypes.string.isRequired,
};

export default FollowCard;

import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import UserContext from "../../context/user/userContext";

import "./profileCard.style.scss";
import profileImg from "../../assets/images/twiter-profile.jpg";
import Btn from "../btn/Btn.component";

const ProfileCard = ({ userUID }) => {
  const {
    following,
    followUser,
    unfollowUser,
    user,
    getFollowInfo,
  } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followInfo, setFollowInfo] = useState(null);

  const followFunc = () => {
    if (isFollowing) {
      unfollowUser(userUID);
    } else {
      followUser(userUID);
    }
  };

  useEffect(() => {
    getFollowInfo(userUID).then((item) => setFollowInfo(item));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (following.followingList.includes(userUID)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [following, userUID]);

  if (followInfo) {
    return (
      <div className="profile-card flex jc-sb">
        <div className="profile-card__img">
          <img src={profileImg} alt="profile" />
        </div>
        <div className="profile-card__info flex jc-sb ai-c">
          <div className="">
            <div className="profile-card__title flex">
              <h2 className="fs-med">{followInfo.profileFollow.name}</h2>
              <span className="fs-med fc-secondary">
                {followInfo.profileFollow.email}
              </span>
            </div>
            <p className="fs-med bio">{followInfo.profileFollow.bio}</p>
            <span className="fs-med">
              {followInfo.followersFollow.followerList.length}{" "}
              <span className="fc-secondary">{"Followers"}</span>
            </span>
          </div>
          {user.userUID !== userUID && (
            <Btn
              text={`${isFollowing ? "Unfollow" : "Follow"}`}
              onClick={followFunc}
              no_bg={isFollowing}
              med
              isFollowing
            ></Btn>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

ProfileCard.propTypes = { userUID: PropTypes.string.isRequired };

export default ProfileCard;

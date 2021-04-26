import PropTypes from "prop-types";

import { getMonthAndDay } from "../../utils/utils";

import "./feedHead.style.scss";
import profileImg from "../../assets/images/twiter-profile.jpg";
import pannelImg from "../../assets/images/twitter-pannel.png";
import Btn from "../../components/btn/Btn.component";
import IconInfo from "../../components/icon-info/IconInfo.component";
import FollowNumberLink from "../../components/follow-number-link/FollowNumberLink.component";

const FeedHead = ({
  user: { name, email, bio, birthday, location, accountBd },
  followers,
  following,
}) => {
  return (
    <div className="feed-head">
      <div className="head-img">
        <img src={pannelImg} alt="head" />
      </div>
      <div className="profile">
        <div className="profile__img">
          <img src={profileImg} alt="profile" />
        </div>
        <Btn url="#!" text="Follow" no_bg med></Btn>
        <div className="profile__info">
          <h2 className="fs-big">{name}</h2>
          <span className="fs-med fc-secondary">{email}</span>
          <p className="fs-med bio">{bio}</p>
          <div className="more-info flex flex-fw-w">
            <IconInfo icon="fas fa-map-marker-alt" text={location}></IconInfo>
            <IconInfo icon="fas fa-birthday-cake" text={birthday}></IconInfo>
            <IconInfo
              icon="fas fa-calendar-alt"
              text={`Joined ${getMonthAndDay(accountBd)}`}
            ></IconInfo>
          </div>
          <div className="follow-numbers">
            <FollowNumberLink
              url="#!"
              number={following.number}
              text="Following"
            ></FollowNumberLink>
            <FollowNumberLink
              url="#!"
              number={followers.number}
              text="Followers"
            ></FollowNumberLink>
          </div>
        </div>
      </div>
    </div>
  );
};

FeedHead.propTypes = {
  user: PropTypes.object.isRequired,
  followers: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
};

export default FeedHead;

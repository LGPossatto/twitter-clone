import "./feedHead.style.scss";
import headImg from "../../assets/images/placeholder.png";
import Btn from "../../components/btn/Btn.component";
import IconInfo from "../../components/icon-info/IconInfo.component";
import FollowNumberLink from "../../components/follow-number-link/FollowNumberLink.component";

const FeedHead = () => {
  return (
    <div className="feed-head">
      <div className="head-img">
        <img src={headImg} alt="head" />
      </div>
      <div className="profile">
        <div className="profile__img">
          <img src={headImg} alt="profile" />
        </div>
        <Btn url="#!" text="Follow" no_bg></Btn>
        <div className="profile__info">
          <h2 className="fs-big">Name</h2>
          <span className="fs-med fc-secondary">@login</span>
          <p className="fs-med bio">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
            ea itaque quam est sed, explicabo temporibus mollitia facilis
            aliquid accusamus asperiores ad magnam corrupti ducimus!
          </p>
          <div className="more-info flex flex-fw-w">
            <IconInfo icon="fas fa-map-marker-alt" text="everywhere"></IconInfo>
            <IconInfo
              icon="fas fa-link"
              text="about.twitter.com"
              url="#!"
            ></IconInfo>
            <IconInfo
              icon="fas fa-birthday-cake"
              text="Born March 21"
            ></IconInfo>
            <IconInfo
              icon="fas fa-calendar-alt"
              text="Joined February 2007"
            ></IconInfo>
          </div>
          <div className="follow-numbers">
            <FollowNumberLink
              url="#!"
              number="35"
              text="Following"
            ></FollowNumberLink>
            <FollowNumberLink
              url="#!"
              number="58.5M"
              text="Followers"
            ></FollowNumberLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedHead;

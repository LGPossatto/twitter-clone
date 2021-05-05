import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { toTitleCase } from "../../utils/utils";
import UserContext from "../../context/user/userContext";

import "./follow.style.scss";
import ProfileCard from "../../components/profile-card/ProfileCard.component";

const Follow = () => {
  const {
    following: { followingList },
    followers: { followerList },
  } = useContext(UserContext);
  const [followList, setFollowList] = useState([]);
  const { follow } = useParams();

  useEffect(() => {
    if (follow === "following") {
      setFollowList(followingList);
    } else if (follow === "followers") {
      setFollowList(followerList);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="follow flex">
      <div className="follow__content">
        <h2 className="title fs-big flex jc-sb ai-c">
          {toTitleCase(follow)}{" "}
          <Link to="/">
            <i className="fas fa-times fs-big close-comment"></i>
          </Link>
        </h2>
        {followList.map((item) => (
          <ProfileCard key={item} userUID={item}></ProfileCard>
        ))}
      </div>
    </div>
  );
};

export default Follow;

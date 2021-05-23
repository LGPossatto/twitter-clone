import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toTitleCase } from "../../utils/utils";
import UserContext from "../../context/user/userContext";

import "./follow.style.scss";
import ExtraPageLayout from "../../components/extra-page-layout/ExtraPageLayout.component";
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
    <ExtraPageLayout pageTitle={toTitleCase(follow)}>
      {followList.map((item) => (
        <ProfileCard key={item} userUID={item}></ProfileCard>
      ))}
    </ExtraPageLayout>
  );
};

export default Follow;

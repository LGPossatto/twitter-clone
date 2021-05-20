import { useEffect, useContext, useState } from "react";
import UserContext from "../../context/user/userContext";

import { sortObj } from "../../utils/utils";

import "./feed.style.scss";
import FeedHead from "../feed-head/FeedHead.component";
import FeedMenuItem from "../feed-menu-item/FeedMenuItem.component";
import Tweet from "../tweet/Tweet.component";
import TextBox from "../text-box/TextBox.component";
import MobileMenu from "../mobile-menu/MobileMenu.component";

const Feed = () => {
  const {
    user,
    followers,
    following,
    getUserTweets,
    getFollowTweets,
    tweets,
    postTweet,
    logoutUser,
  } = useContext(UserContext);
  const [active, setActive] = useState(true);

  const setFeedActive = () => {
    setActive(true);
  };

  const setTweetActive = () => {
    setActive(false);
  };

  useEffect(() => {
    getUserTweets(user.userUID);
    getFollowTweets();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="feed">
      {user && followers && following ? (
        <>
          <div className="feed__title fs-big flex jc-sb ai-c">
            <h2 className="fs-big">Home</h2>
            <button
              className="logout-btn fs-small fc-primary"
              onClick={logoutUser}
            >
              Logout
            </button>
            <MobileMenu></MobileMenu>
          </div>
          <FeedHead
            user={user}
            followers={followers}
            following={following}
          ></FeedHead>
          <div className="feed__menu flex jc-sb">
            <FeedMenuItem
              text="Feed"
              active={active}
              setActive={setFeedActive}
            ></FeedMenuItem>
            <FeedMenuItem
              text="Tweets"
              active={!active}
              setActive={setTweetActive}
            ></FeedMenuItem>
          </div>
          <TextBox
            placeholder={"What is happening..."}
            btnText={"Tweet"}
            postMsg={postTweet}
            img
          ></TextBox>
        </>
      ) : null}
      {tweets &&
        sortObj(tweets).map((tweet) => {
          return <Tweet key={tweet[1].tweetID} tweet={tweet[1]}></Tweet>;
        })}
    </div>
  );
};

export default Feed;

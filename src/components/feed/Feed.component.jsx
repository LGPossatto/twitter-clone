import { useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";

import "./feed.style.scss";
import FeedHead from "../feed-head/FeedHead.component";
import FeedMenuItem from "../feed-menu-item/FeedMenuItem.component";
import Tweet from "../tweet/Tweet.component";
import TextBox from "../text-box/TextBox.component";

const Feed = () => {
  const {
    user,
    followers,
    following,
    getUserTweets,
    tweets,
    postTweet,
    logoutUser,
  } = useContext(UserContext);

  useEffect(() => {
    getUserTweets(user.userUID);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="feed">
      {user && followers && following ? (
        <>
          <h2 className="feed__title fs-big flex jc-sb ai-c">
            Home{" "}
            <button
              className="logout-btn fs-small fc-primary"
              onClick={logoutUser}
            >
              Logout
            </button>
          </h2>
          <FeedHead
            user={user}
            followers={followers}
            following={following}
          ></FeedHead>
          <div className="feed__menu flex jc-sb">
            <FeedMenuItem url="#!" text="Feed" active></FeedMenuItem>
            <FeedMenuItem url="#!" text="Tweets"></FeedMenuItem>
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
        Object.keys(tweets)
          .reverse()
          .map((tweet) => {
            if (tweet === "number") {
              return null;
            } else {
              return (
                <Tweet
                  key={tweets[tweet].tweetID}
                  tweet={tweets[tweet]}
                ></Tweet>
              );
            }
          })}
    </div>
  );
};

export default Feed;

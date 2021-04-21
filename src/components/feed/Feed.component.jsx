import { useContext } from "react";
import UserContext from "../../context/user/userContext";

import "./feed.style.scss";
import FeedHead from "../feed-head/FeedHead.component";
import FeedMenuItem from "../feed-menu-item/FeedMenuItem.component";
import Tweet from "../tweet/Tweet.component";
import TextBox from "../text-box/TextBox.component";

const Feed = () => {
  const { user, followers, following } = useContext(UserContext);

  return (
    <div className="feed">
      {user && followers && following ? (
        <>
          <h2 className="feed__title fs-big">Home</h2>
          <FeedHead
            user={user}
            followers={followers}
            following={following}
          ></FeedHead>
          <div className="feed__menu flex jc-sb">
            <FeedMenuItem url="#!" text="Tweets" active></FeedMenuItem>
            <FeedMenuItem url="#!" text="Replies"></FeedMenuItem>
            <FeedMenuItem url="#!" text="Likes"></FeedMenuItem>
          </div>
          <TextBox></TextBox>
        </>
      ) : null}
      <Tweet></Tweet>
    </div>
  );
};

export default Feed;
